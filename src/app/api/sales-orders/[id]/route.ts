import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
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
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { sales_order, order_lines } = await request.json()
    
    // Update sales order
    const { data: soData, error: soError } = await supabase
      .from('sales_orders')
      .update(sales_order)
      .eq('id', params.id)
      .select()

    if (soError) {
      return NextResponse.json({ error: soError.message }, { status: 400 })
    }

    // If order_lines provided, update them
    if (order_lines) {
      // Delete existing lines
      await supabase
        .from('sales_order_lines')
        .delete()
        .eq('sales_order_id', params.id)

      // Insert new lines
      const linesWithOrderId = order_lines.map((line: any) => ({
        ...line,
        sales_order_id: params.id
      }))

      const { data: linesData, error: linesError } = await supabase
        .from('sales_order_lines')
        .insert(linesWithOrderId)
        .select()

      if (linesError) {
        return NextResponse.json({ error: linesError.message }, { status: 400 })
      }

      // Update total amount
      const totalAmount = linesData.reduce((sum, line) => sum + (line.line_total || 0), 0)
      
      await supabase
        .from('sales_orders')
        .update({ total_amount: totalAmount })
        .eq('id', params.id)
    }

    return NextResponse.json(soData[0])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Update status to 'Cancelled' instead of hard delete
    const { data, error } = await supabase
      .from('sales_orders')
      .update({ status: 'Cancelled' })
      .eq('id', params.id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}