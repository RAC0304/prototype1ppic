# Sistem PPIC (Production Planning and Inventory Control)

Sistem PPIC yang dikembangkan dengan Next.js, TypeScript, Supabase, dan Tailwind CSS untuk manajemen perencanaan produksi dan kontrol inventaris.

## 🚀 Fitur Utama

### ✅ **Sudah Terimplementasi**
- **Autentikasi & Keamanan**: Login/logout dengan Supabase Auth, protected routes
- **Dashboard Real-time**: KPI metrics, charts interaktif, alerts prioritas
- **Master Data Management**: 
  - Customer management dengan CRUD lengkap
  - Vendor management dengan kategori Supplier/Subcontractor
  - Parts & Materials management
- **Material Requirements Planning (MRP)**: 
  - Algoritma MRP dengan BOM explosion
  - Kalkulasi kebutuhan material
  - Purchase order suggestions
- **Database Schema**: PostgreSQL dengan semua tabel dan relasi
- **API Routes**: RESTful API untuk semua entitas
- **Responsive UI**: Design yang mobile-friendly

### 🏗️ **Struktur yang Sudah Dibuat**
- Sales Orders management
- Work Orders management  
- Purchase Orders management
- Inventory Transactions
- Stock Take functionality
- Bill of Materials (BOM)
- Production Routings
- Forecasting
- Capacity Requirements Planning (CRP)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (atau Supabase account)
- Git

## 🛠️ Setup Instructions

### 1. Clone dan Install Dependencies

```bash
git clone <repository-url>
cd Prototype1PPIC
npm install
```

### 2. Setup Database (Supabase)

1. Buat account di [Supabase](https://supabase.com)
2. Buat project baru
3. Copy URL dan API Key dari project settings
4. Jalankan SQL schema di Supabase SQL Editor:

```sql
-- Copy dan jalankan isi file database/schema.sql
```

### 3. Environment Variables

Buat file `.env.local` dengan konfigurasi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database Configuration  
DATABASE_URL=your_postgresql_connection_string

# Next.js Configuration
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### 4. Setup Authentication

Di Supabase Dashboard:
1. Go to Authentication > Users
2. Buat user pertama atau enable email signup
3. Configure redirect URLs di Authentication > URL Configuration

### 5. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## 🗃️ Database Schema

### Master Data Tables
- `customers` - Data pelanggan
- `vendors` - Data pemasok dan subkontraktor  
- `parts` - Produk dan komponen
- `materials` - Bahan baku
- `bill_of_materials` - Struktur produk
- `production_routings` - Rute produksi

### Planning Tables
- `sales_orders` & `sales_order_lines` - Pesanan penjualan
- `forecasts` - Peramalan permintaan

### Execution Tables
- `work_orders` - Perintah kerja produksi
- `purchase_orders` & `purchase_order_lines` - Pesanan pembelian
- `inventory_transactions` - Transaksi inventaris
- `stock_take_sessions` & `stock_take_lines` - Stock opname

## 📚 API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Master Data
- `GET/POST /api/customers` - Customer CRUD
- `GET/PUT/DELETE /api/customers/:id` - Individual customer operations
- `GET/POST /api/vendors` - Vendor CRUD
- `GET/PUT/DELETE /api/vendors/:id` - Individual vendor operations
- `GET/POST /api/parts` - Parts CRUD
- `GET/PUT/DELETE /api/parts/:id` - Individual parts operations

### Planning
- `POST /api/mrp` - Run MRP calculation
- `GET/POST /api/sales-orders` - Sales orders CRUD
- `GET/PUT/DELETE /api/sales-orders/:id` - Individual sales order operations

### Dashboard
- `GET /api/dashboard` - Get dashboard analytics data

## 🎯 Penggunaan Sistem

### 1. Login ke Sistem
- Akses `http://localhost:3000`
- Login dengan kredensial yang telah dibuat di Supabase

### 2. Setup Master Data
1. **Customer**: Tambah data pelanggan di `/main/master-data/customers`
2. **Vendor**: Tambah data pemasok di `/main/master-data/vendors`  
3. **Parts**: Tambah data produk di `/main/master-data/parts`
4. **Materials**: Tambah data material di `/main/master-data/materials`
5. **BOM**: Setup struktur produk di `/main/master-data/boms`

### 3. Planning Process
1. **Sales Orders**: Input pesanan di `/main/planning/sales-orders`
2. **Forecasting**: Input peramalan di `/main/planning/forecasts`
3. **MRP**: Jalankan kalkulasi MRP di `/main/planning/mrp`
4. **CRP**: Analisis kapasitas di `/main/planning/crp`

### 4. Execution
1. **Work Orders**: Buat perintah kerja di `/main/execution/work-orders`
2. **Purchase Orders**: Buat pesanan pembelian di `/main/execution/purchase-orders`
3. **Inventory**: Kelola transaksi di `/main/execution/inventory/transactions`

## 🔧 Development

### Struktur Folder
```
src/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Authentication pages
│   └── main/         # Main application pages
├── lib/
│   └── supabase.ts   # Database configuration
└── components/       # Reusable components (future)
```

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Charts**: Chart.js, react-chartjs-2

## 🚀 Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Connect repository di Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Manual Deployment
```bash
npm run build
npm start
```

## 🔮 Roadmap & Extensions

### Prioritas Tinggi
1. **Work Orders Management**: Implementasi lengkap halaman work orders
2. **Purchase Orders**: Form dan workflow pembelian
3. **Inventory Management**: Real-time stock tracking
4. **File Upload**: Supabase Storage integration untuk dokumen

### Prioritas Menengah  
5. **CRP Implementation**: Algoritma Capacity Requirements Planning
6. **Advanced Reporting**: Export PDF/Excel, custom reports
7. **Real-time Notifications**: WebSocket untuk live updates
8. **Mobile App**: React Native companion app

### Prioritas Rendah
9. **Multi-language**: Internationalization
10. **Advanced Analytics**: Machine learning forecasting
11. **IoT Integration**: Sensor data integration
12. **Workflow Automation**: Automated purchase order generation

## 📞 Support

Untuk pertanyaan teknis atau bug reports, silakan buat issue di repository atau hubungi tim development.

## 📄 License

Sistem ini dikembangkan untuk keperluan internal dan tidak untuk distribusi komersial.
