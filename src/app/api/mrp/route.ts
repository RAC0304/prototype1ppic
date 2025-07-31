import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface MRPItem {
  part_id: string
  part_number: string
  part_name: string
  required_quantity: number
  available_quantity: number
  shortage_quantity: number
  due_date: string
  source: 'Sales Order' | 'Forecast'
  reference_id: string
}

interface MRPRequirement {
  material_id: string
  material_code: string
  description: string
  total_required: number
  available_stock: number
  planned_orders: number
  shortage: number
  suggested_po_quantity: number
  supplier_lead_time: number
  order_date: string
}

// Type definitions for Supabase joins - corrected to arrays
interface SalesOrderLineWithJoins {
  quantity: number
  part_id: string
  parts: { part_number: string; part_name: string }[]
  sales_orders: { delivery_date: string; so_number: string; status: string }[]
}

interface ForecastWithJoins {
  quantity: number
  part_id: string
  period: string
  parts: { part_number: string; part_name: string }[]
}

interface BOMWithJoins {
  parent_part_id: string
  child_item_id: string
  child_item_type: string
  quantity_per_parent: number
  materials: { material_code: string; description: string; unit_price: number }[]
}

export async function POST(request: NextRequest) {
  try {
    const { planningHorizonDays = 90 } = await request.json()
    
    // Calculate planning horizon
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + planningHorizonDays)

    // Step 1: Get gross requirements from sales orders
    const { data: salesOrderLines, error: soError } = await supabase
      .from('sales_order_lines')
      .select(`
        quantity,
        part_id,
        parts(part_number, part_name),
        sales_orders(delivery_date, so_number, status)
      `)
      .gte('sales_orders.delivery_date', startDate.toISOString().split('T')[0])
      .lte('sales_orders.delivery_date', endDate.toISOString().split('T')[0])
      .in('sales_orders.status', ['Open', 'Confirmed', 'In Production'])

    if (soError) throw soError

    // Step 2: Get forecast requirements
    const { data: forecasts, error: forecastError } = await supabase
      .from('forecasts')
      .select(`
        quantity,
        part_id,
        period,
        parts(part_number, part_name)
      `)
      .gte('period', startDate.toISOString().split('T')[0])
      .lte('period', endDate.toISOString().split('T')[0])

    if (forecastError) throw forecastError

    // Step 3: Combine requirements
    const grossRequirements: { [key: string]: MRPItem } = {}

    // Add sales order requirements with proper type casting and array handling
    const typedSalesOrderLines = salesOrderLines as unknown as SalesOrderLineWithJoins[]
    typedSalesOrderLines?.forEach(line => {
      const part = line.parts?.[0] // Get first element from array
      const salesOrder = line.sales_orders?.[0] // Get first element from array
      const key = `${line.part_id}_${salesOrder?.delivery_date}`
      
      if (!grossRequirements[key]) {
        grossRequirements[key] = {
          part_id: line.part_id,
          part_number: part?.part_number || '',
          part_name: part?.part_name || '',
          required_quantity: 0,
          available_quantity: 0,
          shortage_quantity: 0,
          due_date: salesOrder?.delivery_date || '',
          source: 'Sales Order',
          reference_id: salesOrder?.so_number || ''
        }
      }
      grossRequirements[key].required_quantity += line.quantity || 0
    })

    // Add forecast requirements with proper type casting and array handling
    const typedForecasts = forecasts as unknown as ForecastWithJoins[]
    typedForecasts?.forEach(forecast => {
      const part = forecast.parts?.[0] // Get first element from array
      const key = `${forecast.part_id}_${forecast.period}`
      
      if (!grossRequirements[key]) {
        grossRequirements[key] = {
          part_id: forecast.part_id,
          part_number: part?.part_number || '',
          part_name: part?.part_name || '',
          required_quantity: forecast.quantity || 0,
          available_quantity: 0,
          shortage_quantity: 0,
          due_date: forecast.period,
          source: 'Forecast',
          reference_id: `FORECAST-${forecast.period}`
        }
      }
    })

    // Step 4: Get current inventory levels (simplified - would need actual inventory calculation)
    const partIds = [...new Set(Object.values(grossRequirements).map(req => req.part_id))]
    
    // Mock inventory data - in real implementation, calculate from inventory_transactions
    const mockInventory: { [key: string]: number } = {}
    partIds.forEach(partId => {
      mockInventory[partId] = Math.floor(Math.random() * 1000) // Random inventory for demo
    })

    // Step 5: Calculate net requirements and explode BOM
    const { data: bomData, error: bomError } = await supabase
      .from('bill_of_materials')
      .select(`
        parent_part_id,
        child_item_id,
        child_item_type,
        quantity_per_parent,
        materials(material_code, description, unit_price)
      `)
      .in('parent_part_id', partIds)
      .eq('child_item_type', 'Material')

    if (bomError) throw bomError

    // Calculate material requirements with proper type casting and array handling
    const materialRequirements: { [key: string]: MRPRequirement } = {}
    const typedBomData = bomData as unknown as BOMWithJoins[]

    Object.values(grossRequirements).forEach(requirement => {
      // Calculate net requirement
      const availableQty = mockInventory[requirement.part_id] || 0
      requirement.available_quantity = availableQty
      requirement.shortage_quantity = Math.max(0, requirement.required_quantity - availableQty)

      // Explode BOM for this part
      const partBom = typedBomData?.filter(bom => bom.parent_part_id === requirement.part_id)
      
      partBom?.forEach(bomLine => {
        const material = bomLine.materials?.[0] // Get first element from array
        const materialKey = bomLine.child_item_id
        const requiredMaterialQty = requirement.shortage_quantity * (bomLine.quantity_per_parent || 0)

        if (!materialRequirements[materialKey]) {
          materialRequirements[materialKey] = {
            material_id: bomLine.child_item_id,
            material_code: material?.material_code || '',
            description: material?.description || '',
            total_required: 0,
            available_stock: Math.floor(Math.random() * 500), // Mock stock
            planned_orders: 0,
            shortage: 0,
            suggested_po_quantity: 0,
            supplier_lead_time: 7, // Mock lead time
            order_date: ''
          }
        }

        materialRequirements[materialKey].total_required += requiredMaterialQty
      })
    })

    // Step 6: Calculate purchase order suggestions
    Object.values(materialRequirements).forEach(matReq => {
      matReq.shortage = Math.max(0, matReq.total_required - matReq.available_stock)
      
      if (matReq.shortage > 0) {
        // Calculate suggested PO quantity (with safety stock)
        const safetyStockPercent = 0.2 // 20% safety stock
        matReq.suggested_po_quantity = Math.ceil(matReq.shortage * (1 + safetyStockPercent))
        
        // Calculate order date (considering lead time)
        const orderDate = new Date()
        orderDate.setDate(orderDate.getDate() - matReq.supplier_lead_time)
        matReq.order_date = orderDate.toISOString().split('T')[0]
      }
    })

    // Return MRP results
    const mrpResults = {
      grossRequirements: Object.values(grossRequirements),
      materialRequirements: Object.values(materialRequirements),
      planningHorizon: planningHorizonDays,
      generatedAt: new Date().toISOString(),
      summary: {
        totalParts: Object.keys(grossRequirements).length,
        totalMaterials: Object.keys(materialRequirements).length,
        materialsWithShortage: Object.values(materialRequirements).filter(m => m.shortage > 0).length,
        totalPOValue: Object.values(materialRequirements)
          .reduce((sum, m) => sum + (m.suggested_po_quantity * 10000), 0) // Mock unit price 10k
      }
    }

    return NextResponse.json(mrpResults)
  } catch (error) {
    console.error('MRP calculation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}