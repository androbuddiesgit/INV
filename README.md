# Aplikasi NB FASHION (Profil Perusahaan, Katalog & Manajemen Invoice) 📄💼

Aplikasi web modern berbasis **Next.js** yang dirancang sebagai solusi *2-in-1* untuk perusahaan konveksi garmen. Aplikasi ini berfungsi sebagai **Website Profil Publik (Landing Page)** untuk klien, sekaligus sebagai **Sistem Admin Internal** untuk mengelola katalog produk dan pembuatan invoice otomatis.

## ✨ Fitur Utama

### 🌐 Halaman Publik (Tanpa PIN)
- **Company Profile**: Menampilkan Sejarah, Visi Misi, Layanan (CMT, Makloon, Seragam), dan Kapasitas Pabrik secara elegan.
- **Katalog Produk Live**: Klien dapat melihat daftar produk unggulan lengkap dengan **Foto Produk** dan estimasi harga.
- **Kontak Langsung**: Tombol *Call-to-Action* yang langsung menghubungkan klien ke WhatsApp Divisi Marketing.

### 🔒 Dashboard Admin (Terproteksi PIN)
- **Manajemen Katalog 🛍️**: Upload foto produk, edit nama, deskripsi, dan harga barang untuk ditampilkan di halaman depan.
- **Auto-Fill Invoice ⚡**: Buat invoice jauh lebih cepat! Cukup pilih barang dari dropdown katalog, maka nama dan harga akan terisi otomatis.
- **📝 CRUD Invoice Lengkap**: Buat, lihat, edit, dan hapus invoice dengan mudah. Fitur 1 Set barang (banyak deskripsi dalam 1 Qty/Harga) didukung penuh.
- **📄 Cetak & Download PDF**: Generate invoice ke format A4 PDF secara langsung dari browser (menggunakan `html2canvas` & `jspdf`).
- **💬 Bagikan ke WhatsApp**: Bagikan *File PDF* invoice langsung ke aplikasi WhatsApp klien Anda dengan satu kali klik.
- **🔢 Auto "Terbilang"**: Mengonversi total angka mata uang ke format kalimat bahasa Indonesia secara otomatis.
- **💳 Manajemen DP & Pelunasan**: Pantau Uang Muka (DP). Tersedia fitur 1-klik untuk men-generate invoice Pelunasan otomatis.
- **⚙️ Pengaturan Profil (Kop Surat)**: Sesuaikan Nama Perusahaan, Rekening, Logo, dan Stempel yang terintegrasi ke dalam cetakan PDF.

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
- **Halaman Profil Publik**: Akses `http://localhost:3000`
- **Halaman Admin**: Klik tombol "Login Admin" atau akses `http://localhost:3000/dashboard` *(Masukkan PIN default: `202608` jika diminta).*

## 🌐 Deployment (Vercel)

Aplikasi ini sangat dioptimalkan untuk di-deploy ke **Vercel**.
1. Hubungkan repositori GitHub Anda ke Vercel.
2. Tambahkan Integrasi **Storage (Postgres)** di menu Vercel (seperti Neon DB).
3. Pastikan `DATABASE_URL` terbentuk di tab *Environment Variables*.
4. Vercel akan secara otomatis mem-build dan mem-publish aplikasi Anda.

---
*Dikembangkan untuk menunjang produktivitas dan branding NB FASHION - The Power of Cikijing Garment Industry.*
