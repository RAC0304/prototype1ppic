import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const customer_id = searchParams.get('customer_id') || ''

    let query = supabase
      .from('sales_orders')
      .select(`
        *,
        customers(name, customer_code),
        sales_order_lines(
          id,
          part_id,
          quantity,
          unit_price,
          line_total,
          parts(part_number, part_name)
        )
      `)
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`so_number.ilike.%${search}%`)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (customer_id) {
      query = query.eq('customer_id', customer_id)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sales_order, order_lines } = await request.json()
    
    // Insert sales order
    const { data: soData, error: soError } = await supabase
      .from('sales_orders')
      .insert([sales_order])
      .select()

    if (soError) {
      return NextResponse.json({ error: soError.message }, { status: 400 })
    }

    const salesOrderId = soData[0].id

    // Insert order lines
    const linesWithOrderId = order_lines.map((line: Record<string, unknown>) => ({
      ...line,
      sales_order_id: salesOrderId
    }))

    const { data: linesData, error: linesError } = await supabase
      .from('sales_order_lines')
      .insert(linesWithOrderId)
      .select()

    if (linesError) {
      // Rollback sales order if lines insertion fails
      await supabase.from('sales_orders').delete().eq('id', salesOrderId)
      return NextResponse.json({ error: linesError.message }, { status: 400 })
    }

    // Update total amount
    const totalAmount = linesData.reduce((sum, line) => sum + (line.line_total || 0), 0)
    
    await supabase
      .from('sales_orders')
      .update({ total_amount: totalAmount })
      .eq('id', salesOrderId)

    return NextResponse.json({ 
      sales_order: soData[0], 
      order_lines: linesData 
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}