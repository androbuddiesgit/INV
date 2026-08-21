'use client';

import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InvoiceView({ invoice, settings }: { invoice: any, settings: any }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const data = canvas.toDataURL('image/png');

      // A4 Size in mm: 210 x 297
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${invoice.invoiceNumber.replace(/\//g, '_')}.pdf`);
    } catch (error) {
      console.error(error);
      alert('Gagal mendownload PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareWA = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`Halo ${invoice.toName},\n\nBerikut adalah Invoice Anda dengan nomor *${invoice.invoiceNumber}*.\n\nSilakan klik link di bawah ini untuk melihat detail atau mengunduh file PDF-nya:\n${url}\n\nTerima kasih.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
          <ArrowLeft size={20} /> Kembali ke Dashboard
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleShareWA}
            className="flex items-center gap-2 px-4 py-2 border border-green-500 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-medium"
          >
            <Share2 size={18} />
            Share WhatsApp
          </button>
          <button 
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            <Download size={18} />
            {isDownloading ? 'Menyimpan...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* A4 Paper Container */}
      <div className="flex justify-center overflow-x-auto pb-12">
        <div 
          ref={printRef}
          className="bg-white shadow-lg relative"
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            padding: '20mm',
            boxSizing: 'border-box' 
          }}
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-10 border-b pb-6">
            <div className="w-20 h-20 bg-blue-800 flex items-center justify-center text-white font-bold text-3xl font-serif flex-shrink-0 overflow-hidden">
              {settings.companyLogo && settings.companyLogo.startsWith('data:image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={settings.companyLogo} alt="Logo" className="w-full h-full object-contain bg-white" />
              ) : (
                settings.companyLogo
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif">{settings.companyName}</h1>
              <p className="text-sm whitespace-pre-wrap">{settings.companyAddress}</p>
              <p className="text-sm">Hp : {settings.companyPhone}</p>
            </div>
          </div>

          <h2 className="text-center text-3xl font-bold text-blue-500 mb-8 font-serif uppercase">
            INVOICE
          </h2>

          {/* Meta Info */}
          <div className="flex justify-between mb-8 text-sm">
            <div>
              <p>To :</p>
              <p className="font-semibold text-lg">{invoice.toName}</p>
              <p className="whitespace-pre-wrap">{invoice.toAddress}</p>
              <div className="mt-4">
                {invoice.toContact && <p>{invoice.toContact}</p>}
                {invoice.toPhone && <p>{invoice.toPhone}</p>}
              </div>
            </div>
            <div>
              <table className="text-sm">
                <tbody>
                  <tr>
                    <td className="pr-4 pb-1">No Invoice</td>
                    <td className="pb-1">: {invoice.invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td className="pr-4">Tanggal</td>
                    <td>: {format(new Date(invoice.date), 'dd MMMM yyyy', { locale: localeId })}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-black mb-6 text-sm">
            <thead>
              <tr className="bg-gray-100 text-center font-bold border-b border-black">
                <th className="border-r border-black p-2 w-12">NO</th>
                <th className="border-r border-black p-2">DESCRIPTION</th>
                <th className="border-r border-black p-2 w-24">QTY</th>
                <th className="border-r border-black p-2 w-32">PRICE</th>
                <th className="p-2 w-36">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {invoice.items.map((item: any, i: number) => (
                <tr key={item.id} className="border-b border-black text-center">
                  <td className="border-r border-black p-2">{i + 1}</td>
                  <td className="border-r border-black p-2 text-left">{item.description}</td>
                  <td className="border-r border-black p-2">{item.qty} Pcs</td>
                  <td className="border-r border-black p-2 text-right">{item.price.toLocaleString('id-ID')}</td>
                  <td className="p-2 text-right">{item.total.toLocaleString('id-ID')}</td>
                </tr>
              ))}
              
              {/* Fill empty rows if needed to make it look like the template */}
              {[...Array(Math.max(0, 3 - invoice.items.length))].map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-black h-8 text-center">
                  <td className="border-r border-black p-2"></td>
                  <td className="border-r border-black p-2"></td>
                  <td className="border-r border-black p-2"></td>
                  <td className="border-r border-black p-2"></td>
                  <td className="p-2"></td>
                </tr>
              ))}
              
              <tr className="font-extrabold border-b border-black text-right">
                <td colSpan={4} className="border-r border-black p-2 uppercase">SUB TOTAL</td>
                <td className="p-2">{invoice.subTotal.toLocaleString('id-ID')}</td>
              </tr>
              <tr className="font-extrabold border-b border-black text-right">
                <td colSpan={4} className="border-r border-black p-2 uppercase">DP</td>
                <td className="p-2">{invoice.dp.toLocaleString('id-ID')}</td>
              </tr>
              <tr className="font-extrabold border-b border-black text-right">
                <td colSpan={4} className="border-r border-black p-2 uppercase">SISA TAGIHAN</td>
                <td className="p-2">{invoice.sisaTagihan.toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>

          {/* Terbilang */}
          {invoice.terbilang && (
            <div className="mb-10 text-sm font-medium italic flex">
              <span className="w-24 flex-shrink-0">Terbilang</span>
              <span className="flex-1">: {invoice.terbilang}</span>
            </div>
          )}

          {/* Payment Info */}
          <div className="flex justify-between text-sm">
            <div>
              <p className="mb-2">Pembayaran :</p>
              <table className="mt-2">
                <tbody>
                  <tr>
                    <td className="pr-4 pb-1">No Rekening</td>
                    <td className="pb-1">: {settings.bankAccount}</td>
                  </tr>
                  <tr>
                    <td className="pr-4 pb-1">Bank</td>
                    <td className="pb-1">: {settings.bankName}</td>
                  </tr>
                  <tr>
                    <td className="pr-4">Atas Nama</td>
                    <td>: {settings.bankOwner}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signature */}
            <div className="text-center mr-8">
              <p>Majalengka, {format(new Date(invoice.date), 'dd MMMM yyyy', { locale: localeId })}</p>
              <p className="mb-24">Hormat kami,</p>
              
              {/* Logo / Stamp placeholder */}
              <div className="absolute mt-[-60px] ml-4 pointer-events-none flex justify-center items-center">
                 {settings.stampLogo && settings.stampLogo.startsWith('data:image') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={settings.stampLogo} alt="Stamp" className="w-24 h-24 object-contain opacity-70" />
                 ) : (
                    <div className="text-6xl font-bold font-serif text-blue-800 italic opacity-30">{settings.companyLogo}</div>
                 )}
              </div>

              <p className="font-extrabold uppercase underline underline-offset-4">{settings.officerName}</p>
              <p>{settings.officerTitle}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
