import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Customer {
  id: string
  customer_code: string
  name: string
  address: string
  contact_person: string
  email: string
  phone: string
  status: 'Active' | 'Inactive'
  created_at: string
  updated_at: string
}

export interface Vendor {
  id: string
  vendor_code: string
  name: string
  category: 'Supplier' | 'Subcontractor'
  address: string
  contact_person: string
  email: string
  phone: string
  status: 'Active' | 'Inactive'
  created_at: string
  updated_at: string
}

export interface Part {
  id: string
  part_number: string
  part_name: string
  part_type: 'Finished Goods' | 'WIP' | 'Component'
  uom: string
  description?: string
  status: 'Active' | 'Discontinue'
  created_at: string
  updated_at: string
}

export interface Material {
  id: string
  material_code: string
  description: string
  spec: string
  uom: string
  unit_price?: number
  status: 'Active' | 'Inactive'
  created_at: string
  updated_at: string
}

export interface BillOfMaterial {
  id: string
  parent_part_id: string
  child_item_id: string
  child_item_type: 'Part' | 'Material'
  quantity_per_parent: number
  created_at: string
  updated_at: string
}

export interface ProductionRouting {
  id: string
  part_id: string
  sequence_number: number
  process_name: string
  machine_id?: string
  capacity_per_hour: number
  setup_time_minutes?: number
  created_at: string
  updated_at: string
}

export interface SalesOrder {
  id: string
  so_number: string
  customer_id: string
  order_date: string
  delivery_date: string
  status: 'Open' | 'Confirmed' | 'In Production' | 'Shipped' | 'Completed' | 'Cancelled'
  total_amount: number
  document_url?: string
  created_at: string
  updated_at: string
}

export interface SalesOrderLine {
  id: string
  sales_order_id: string
  part_id: string
  quantity: number
  unit_price: number
  line_total: number
  created_at: string
  updated_at: string
}

export interface WorkOrder {
  id: string
  wo_number: string
  part_id: string
  quantity_to_produce: number
  quantity_completed: number
  quantity_scrapped: number
  status: 'Planned' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled'
  due_date: string
  start_date?: string
  completion_date?: string
  created_at: string
  updated_at: string
}

export interface PurchaseOrder {
  id: string
  po_number: string
  vendor_id: string
  order_date: string
  expected_delivery_date: string
  status: 'Draft' | 'Sent' | 'Confirmed' | 'Received' | 'Cancelled'
  total_amount: number
  created_at: string
  updated_at: string
}

export interface PurchaseOrderLine {
  id: string
  purchase_order_id: string
  material_id: string
  quantity: number
  unit_price: number
  line_total: number
  quantity_received: number
  created_at: string
  updated_at: string
}

export interface InventoryTransaction {
  id: string
  item_id: string
  item_type: 'Part' | 'Material'
  transaction_type: 'Receipt' | 'Issue' | 'Transfer' | 'Adjustment'
  quantity: number
  unit_cost?: number
  reference_id?: string
  reference_type?: string
  notes?: string
  timestamp: string
  created_by: string
}

export interface StockTakeSession {
  id: string
  description: string
  status: 'Planning' | 'In Progress' | 'Completed' | 'Cancelled'
  start_date: string
  completion_date?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface StockTakeLine {
  id: string
  session_id: string
  item_id: string
  item_type: 'Part' | 'Material'
  system_quantity: number
  counted_quantity?: number
  variance?: number
  notes?: string
  counted_by?: string
  counted_at?: string
  created_at: string
  updated_at: string
}

export interface Forecast {
  id: string
  part_id: string
  period: string
  quantity: number
  notes?: string
  created_at: string
  updated_at: string
}