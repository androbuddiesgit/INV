# Marketing Invoice App

Aplikasi pembuatan invoice marketing, dibuat khusus agar mudah dideploy di server Armbian menggunakan Cloudflare Zero Trust.

## Prasyarat Server (Armbian)
- Node.js (v18 atau lebih baru)
- NPM atau Yarn
- `cloudflared` (Untuk Cloudflare Zero Trust)

## Cara Menjalankan Aplikasi

1. Install dependencies
```bash
npm install
```

2. Jalankan migrasi database
```bash
npx prisma db push
```

3. Build aplikasi Next.js
```bash
npm run build
```

4. Jalankan server production
```bash
npm run start
```
*Aplikasi akan berjalan di port 3000.*

## Konfigurasi Cloudflare Zero Trust

Karena aplikasi ini diakses melalui jaringan publik namun bersifat internal, sangat direkomendasikan menggunakan Cloudflare Tunnel:

1. Install `cloudflared` di Armbian.
2. Login dan buat tunnel:
```bash
cloudflared tunnel login
cloudflared tunnel create invoice-app
```
3. Route trafik tunnel ke localhost:3000:
```bash
cloudflared tunnel route dns invoice-app invoice.domain-anda.com
```
4. Jalankan tunnel:
```bash
cloudflared tunnel run --url http://localhost:3000 invoice-app
```
5. Buka dashboard Cloudflare Zero Trust dan atur **Access Application** untuk membatasi siapa saja yang bisa mengakses URL tersebut (misalnya hanya email perusahaan).
