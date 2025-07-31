import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Type definitions for Supabase joins - corrected to arrays
interface ProductionWithJoins {
  part_id: string
  quantity_completed: number
  parts: { part_name: string }[]
}

interface CustomerRankingWithJoins {
  quantity: number
  sales_orders: {
    customer_id: string
    customers: { name: string }[]
  }[]
}

interface UrgentSOWithJoins {
  id: string
  so_number: string
  delivery_date: string
  status: string
  customers: { name: string }[]
}

interface UrgentWOWithJoins {
  id: string
  wo_number: string
  due_date: string
  status: string
  parts: { part_name: string }[]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = parseInt(searchParams.get('period') || '30')
    
    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - period)

    // Get total revenue from sales orders
    const { data: salesData, error: salesError } = await supabase
      .from('sales_orders')
      .select('total_amount, order_date')
      .gte('order_date', startDate.toISOString().split('T')[0])
      .lte('order_date', endDate.toISOString().split('T')[0])
    
    if (salesError) throw salesError

    const totalRevenue = salesData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

    // Get units produced from work orders
    const { data: workOrderData, error: woError } = await supabase
      .from('work_orders')
      .select('quantity_completed, completion_date, status')
      .gte('completion_date', startDate.toISOString().split('T')[0])
      .lte('completion_date', endDate.toISOString().split('T')[0])
    
    if (woError) throw woError

    const unitsProduced = workOrderData?.reduce((sum, wo) => sum + (wo.quantity_completed || 0), 0) || 0

    // Calculate on-time delivery percentage
    const { data: deliveryData, error: deliveryError } = await supabase
      .from('sales_orders')
      .select('delivery_date, status')
      .in('status', ['Shipped', 'Completed'])
      .gte('order_date', startDate.toISOString().split('T')[0])
    
    if (deliveryError) throw deliveryError

    const totalOrders = deliveryData?.length || 0
    const onTimeOrders = deliveryData?.filter(order => 
      new Date(order.delivery_date) >= new Date()
    ).length || 0
    
    const onTimeDelivery = totalOrders > 0 ? (onTimeOrders / totalOrders) * 100 : 100

    // Mock inventory value (would need inventory calculations in real implementation)
    const inventoryValue = 2500000000 // 2.5B IDR

    // Generate sales growth data (last 6 months)
    const salesGrowth = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [125, 150, 175, 200, 180, 220] // Million IDR
    }

    // Get production data by part with proper typing and array handling
    const { data: productionByPart, error: prodError } = await supabase
      .from('work_orders')
      .select(`
        part_id,
        quantity_completed,
        parts(part_name)
      `)
      .eq('status', 'Completed')
      .gte('completion_date', startDate.toISOString().split('T')[0])
      .limit(5)
    
    if (prodError) throw prodError

    const typedProductionData = productionByPart as unknown as ProductionWithJoins[]
    const productionData = {
      labels: typedProductionData?.map(item => item.parts?.[0]?.part_name || 'Unknown') || [],
      data: typedProductionData?.map(item => item.quantity_completed || 0) || []
    }

    // Get customer ranking with proper typing and array handling
    const { data: customerRanking, error: custError } = await supabase
      .from('sales_order_lines')
      .select(`
        quantity,
        sales_orders(customer_id, customers(name))
      `)
      .gte('created_at', startDate.toISOString())
    
    if (custError) throw custError

    // Process customer ranking data with proper typing and array handling
    const customerVolumes: { [key: string]: { name: string; volume: number } } = {}
    const typedCustomerRanking = customerRanking as unknown as CustomerRankingWithJoins[]
    
    typedCustomerRanking?.forEach(line => {
      const salesOrder = line.sales_orders?.[0] // Get first element from array
      const customer = salesOrder?.customers?.[0] // Get first element from array
      const customerName = customer?.name || 'Unknown'
      
      if (!customerVolumes[customerName]) {
        customerVolumes[customerName] = { name: customerName, volume: 0 }
      }
      customerVolumes[customerName].volume += line.quantity || 0
    })

    const topCustomers = Object.values(customerVolumes)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5)

    // Get urgent items with proper typing and array handling
    const { data: urgentSO, error: urgentSOError } = await supabase
      .from('sales_orders')
      .select('id, so_number, delivery_date, status, customers(name)')
      .lte('delivery_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .in('status', ['Open', 'Confirmed', 'In Production'])
      .limit(3)
    
    if (urgentSOError) throw urgentSOError

    const { data: urgentWO, error: urgentWOError } = await supabase
      .from('work_orders')
      .select('id, wo_number, due_date, status, parts(part_name)')
      .lte('due_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .in('status', ['Planned', 'Scheduled', 'In Progress'])
      .limit(3)
    
    if (urgentWOError) throw urgentWOError

    const typedUrgentSO = urgentSO as unknown as UrgentSOWithJoins[]
    const typedUrgentWO = urgentWO as unknown as UrgentWOWithJoins[]

    const urgentItems = [
      ...(typedUrgentSO?.map(so => ({
        id: so.id,
        type: 'SO' as const,
        reference: so.so_number,
        description: `Order untuk ${so.customers?.[0]?.name || 'Unknown'}`,
        dueDate: so.delivery_date,
        status: so.status,
        priority: 'High' as const
      })) || []),
      ...(typedUrgentWO?.map(wo => ({
        id: wo.id,
        type: 'WO' as const,
        reference: wo.wo_number,
        description: `Produksi ${wo.parts?.[0]?.part_name || 'Unknown'}`,
        dueDate: wo.due_date,
        status: wo.status,
        priority: 'Medium' as const
      })) || [])
    ]

    // Get work order status distribution
    const { data: woStatusData, error: woStatusError } = await supabase
      .from('work_orders')
      .select('status')
      .gte('created_at', startDate.toISOString())
    
    if (woStatusError) throw woStatusError

    const statusCounts: { [key: string]: number } = {}
    woStatusData?.forEach(wo => {
      statusCounts[wo.status] = (statusCounts[wo.status] || 0) + 1
    })

    const workOrderStatus = {
      labels: Object.keys(statusCounts),
      data: Object.values(statusCounts)
    }

    const dashboardData = {
      totalRevenue,
      unitsProduced,
      onTimeDelivery,
      inventoryValue,
      salesGrowth,
      productionData,
      customerRanking: topCustomers,
      urgentItems,
      workOrderStatus
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}