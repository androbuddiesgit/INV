import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail,
  Shirt,
  Scissors,
  Award
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const settings = await prisma.setting.findFirst();
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              {settings?.companyLogo && settings.companyLogo.startsWith('data:image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.companyLogo} alt="Logo" className="h-12 w-12 object-contain" />
              ) : (
                <div className="text-3xl font-bold text-blue-800 tracking-tighter">NB</div>
              )}
              <span className="font-bold text-xl tracking-tight text-blue-900 hidden sm:block">
                NB FASHION
              </span>
            </div>
            <div className="flex gap-6 items-center font-medium text-sm">
              <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
              <a href="#services" className="hover:text-blue-600 transition-colors">Layanan</a>
              <a href="#katalog" className="hover:text-blue-600 transition-colors">Katalog</a>
              <a href="#contact" className="hover:text-blue-600 transition-colors">Kontak</a>
              <Link 
                href="/dashboard"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-blue-900 to-blue-900"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            NB FASHION
          </h1>
          <p className="text-xl md:text-3xl font-light text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            The Power of Cikijing Garment Industry.<br/>
            Modern. Authentic. You.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#katalog" className="bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
              Lihat Koleksi
            </a>
            <a href="#contact" className="bg-blue-800 text-white border border-blue-700 px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6">
                <Building2 size={16} /> Tentang Kami
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 leading-tight">
                Perusahaan Konveksi Skala Industri Sejak 2012
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                NB FASHION adalah perusahaan konveksi skala industri yang berdiri sejak 2012 di Kecamatan Cikijing, Kabupaten Majalengka, Jawa Barat. Selama 14 tahun, kami tumbuh dari konveksi rumahan menjadi pabrik garmen dengan kapasitas produksi <strong>200.000 pcs/bulan</strong>.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                Dipercaya oleh 200+ brand nasional, instansi pemerintah, BUMN, dan korporasi untuk produksi massal. Keunggulan utama kami: <strong>One Stop Production</strong>. Semua proses dari bahan mentah sampai packing kami kerjakan in-house di Cikijing.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-3xl font-black text-slate-900">200K+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Kapasitas / Bulan</div>
                </div>
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-3xl font-black text-slate-900">200+</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Brand Partner</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900">VISI</h3>
              <p className="text-slate-600 mb-10 italic">
                "Menjadi industri garmen dari Majalengka yang mampu bersaing di level nasional melalui teknologi, kapasitas, dan integritas dan menjadi mitra produksi terpercaya."
              </p>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900">MISI</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span>Menyediakan solusi produksi pakaian massal dengan standar QC ekspor.</span>
                </li>
                <li className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span>Investasi teknologi untuk efisiensi & presisi produksi.</span>
                </li>
                <li className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span>Meningkatkan pemberdayaan masyarakat & menjadi pusat tenaga kerja terampil di Majalengka Timur.</span>
                </li>
                <li className="flex gap-3 text-slate-600">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <span>Menjaga komitmen lead time & harga kompetitif untuk partner B2B.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Target & Capacity */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Target Market Kami</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Target utama kami adalah pelanggan yang membutuhkan pakaian dalam jumlah besar (B2B) seperti seragam kantor, kaos komunitas, instansi, atau brand fashion lokal. Fokus utama kami adalah memproduksi barang berkualitas secara efisien sesuai permintaan.
              </p>
              <div className="space-y-4">
                <div className="bg-slate-800 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-400">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Lead Time Standar</h4>
                    <p className="text-slate-400">10-21 hari kerja untuk qty besar</p>
                  </div>
                </div>
                <div className="bg-slate-800 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-400">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Garansi Produksi</h4>
                    <p className="text-slate-400">Komitmen ganti 100% jika kesalahan dari pihak kami</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8">Fasilitas & Teknologi</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Cutting", desc: "Mesin Potong Jumbo, Meja Potong 12m | Akurasi pola skala besar" },
                  { title: "Jahit (Jarum 1)", desc: "60+ Unit Mesin High-Speed Juki & Brother (Kaos, Kemeja, Jaket, Celana)" },
                  { title: "Obras & Overdeck", desc: "15 Unit (Finishing bersih standar butik)" },
                  { title: "Bordir Komputer", desc: "4 Mesin 12 Kepala (5.000 logo/hari. 3D, lencana)" },
                  { title: "Sablon Manual", desc: "8 Meja Sablon 56 palet (Plastisol, Rubber, Discharge, Foil)" },
                  { title: "Printing DTF", desc: "2 Mesin Large Format (Satuan & gambar full color)" },
                  { title: "Printing Sublim", desc: "Mesin Roll-to-Roll 1.8m (Jersey & gamis printing)" },
                  { title: "Laser & Finishing", desc: "Mesin Laser CO2, Steam Uap, Heatpress, Metal Detector, QC Akhir" }
                ].map((item, i) => (
                  <div key={i} className="border border-slate-700 p-5 rounded-2xl">
                    <h4 className="font-bold text-blue-400 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Layanan & Produk Unggulan</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-16 text-lg">Spesialis Produksi Massal Seragam & Fashion</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: <Shirt size={32} />, title: "Full Package / CMT", desc: "Dari bahan sampai packing. Partner cukup kirim desain." },
              { icon: <Scissors size={32} />, title: "Makloon Skala Besar", desc: "Khusus brand yang sudah punya bahan & pola sendiri." },
              { icon: <Award size={32} />, title: "Seragam Instansi", desc: "PDL/PDH, Wearpack, rompi, dengan kelengkapan bordir & laser nama." },
              { icon: <Building2 size={32} />, title: "Sportswear Industry", desc: "Jersey sublim, jaket tim, training set kualitas premium." },
              { icon: <CheckCircle2 size={32} />, title: "Fashion & Distro", desc: "Kaos 24s/30s, hoodie fleece, crewneck, kemeja flanel. (Min. 100 pcs)" }
            ].map((srv, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-3xl hover:shadow-xl transition-shadow border border-slate-100">
                <div className="text-blue-600 mb-6">{srv.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h4>
                <p className="text-slate-600">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Katalog Section */}
      <section id="katalog" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Katalog Produk</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Koleksi referensi produksi dan estimasi harga</p>
          </div>
          
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500">Katalog belum tersedia saat ini.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map(prod => (
                <div key={prod.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="aspect-square bg-slate-100 relative overflow-hidden">
                    {prod.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Shirt size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{prod.name}</h4>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">{prod.description}</p>
                    <div className="text-blue-600 font-black text-xl">
                      Rp {prod.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Hubungi Divisi Marketing</h2>
          
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            <div className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-3xl w-full max-w-sm backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Phone size={28} />
              </div>
              <h4 className="text-xl font-bold">{settings?.officerName || 'Eko Maryanto'}</h4>
              <p className="text-blue-200 text-xl">{settings?.companyPhone}</p>
              <a 
                href={`https://wa.me/${settings?.companyPhone?.replace(/\D/g,'')}`} 
                target="_blank" 
                rel="noreferrer"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-full font-bold transition-colors"
              >
                Chat via WhatsApp
              </a>
            </div>
            
            <div className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-3xl w-full max-w-sm backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <Mail size={28} />
              </div>
              <h4 className="text-xl font-bold">Email</h4>
              <p className="text-blue-200">ekoriyanto202121@gmail.com</p>
              <p className="text-blue-200">omangabdulsomad3@gmail.com</p>
            </div>
            
            <div className="flex flex-col items-center gap-4 bg-white/10 p-8 rounded-3xl w-full max-w-sm backdrop-blur-sm">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <MapPin size={28} />
              </div>
              <h4 className="text-xl font-bold">Lokasi Pabrik</h4>
              <p className="text-blue-200 text-center">
                {settings?.companyAddress}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-center border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} NB FASHION | The Power of Cikijing Garment Industry</p>
      </footer>
    </div>
  );
}
