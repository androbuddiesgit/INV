# Aplikasi Manajemen Invoice (Marketing) 📄💼

Aplikasi web modern berbasis **Next.js** untuk mengelola, mencetak, dan membagikan tagihan (invoice) secara cepat dan mudah. Aplikasi ini didesain secara spesifik agar *user-friendly*, sangat responsif di perangkat mobile, dan cocok digunakan oleh pengguna dari berbagai kalangan usia.

## ✨ Fitur Utama

- **📝 CRUD Invoice Lengkap**: Buat, lihat, edit, dan hapus invoice dengan mudah.
- **📄 Cetak & Download PDF**: Generate invoice ke format A4 PDF secara langsung dari browser tanpa perlu server tambahan (menggunakan `html2canvas` & `jspdf`).
- **💬 Bagikan ke WhatsApp**: Bagikan file PDF invoice langsung ke WhatsApp klien Anda dengan satu kali klik.
- **🔢 Auto "Terbilang"**: Mengonversi total angka mata uang ke dalam format kalimat bahasa Indonesia secara otomatis (contoh: *1.000.000* menjadi *"Satu Juta Rupiah"*).
- **💳 Manajemen DP & Pelunasan**: Pantau Uang Muka (DP) dan Sisa Tagihan. Tersedia fitur sekali klik untuk membuat invoice Pelunasan baru.
- **⚙️ Pengaturan Profil Perusahaan**: Sesuaikan Nama Perusahaan, Rekening, Logo Header, dan Cap/Stempel perusahaan yang langsung terintegrasi ke dalam cetakan PDF.
- **🔒 PIN Keamanan**: Dilengkapi dengan pelindung *PIN Gate* sederhana (Default PIN: `202608`) untuk mencegah akses sembarangan.
- **📱 Mobile Responsive**: Antarmuka tabel dan tombol yang otomatis menyesuaikan ukuran layar HP sehingga nyaman digunakan.

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database ORM**: Prisma
- **Database**: PostgreSQL (oleh Neon / Vercel Storage)
- **Icons**: Lucide React
- **PDF Generator**: `html2canvas` & `jspdf`

## 🚀 Cara Menjalankan Secara Lokal (Local Development)

Jika Anda ingin menjalankan atau memodifikasi aplikasi ini di komputer Anda sendiri, ikuti langkah-langkah berikut:

### 1. Persiapan
Pastikan Anda sudah menginstal **Node.js** dan **Git** di komputer Anda.

### 2. Clone Repositori
```bash
git clone https://github.com/androbuddiesgit/INV.git
cd "INV Projek"
```

### 3. Instalasi Dependency
```bash
npm install
```

### 4. Konfigurasi Environment (Database)
Buat file bernama `.env` di direktori paling luar (root), lalu isi dengan URL database PostgreSQL Anda:
```env
DATABASE_URL="postgresql://username:password@host/database"
```

### 5. Sinkronisasi Database (Prisma)
Jalankan perintah ini untuk membuat tabel otomatis di dalam database Anda:
```bash
npx prisma db push
```

### 6. Jalankan Server Dev
```bash
npm run dev
```
Buka browser dan akses `http://localhost:3000`. 
*Catatan: Masukkan PIN `202608` jika diminta.*

## 🌐 Deployment (Vercel)

Aplikasi ini sudah dioptimalkan untuk di-deploy ke **Vercel**.
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Tambahkan Integrasi **Storage (Postgres)** di menu Vercel (seperti Neon DB).
3. Pastikan `DATABASE_URL` terbentuk di tab *Environment Variables*.
4. Vercel akan secara otomatis mem-build dan mem-publish aplikasi Anda.

---
*Dibuat untuk memudahkan operasional marketing dan penagihan dengan antarmuka yang bersih & rapi.*
