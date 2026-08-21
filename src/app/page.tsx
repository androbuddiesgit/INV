import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { PlusCircle, FileText, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import DeleteInvoiceButton from './DeleteInvoiceButton';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Riwayat Invoice</h1>
        <div className="flex gap-3">
          <Link 
            href="/settings" 
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Settings size={20} />
            Pengaturan
          </Link>
          <Link 
            href="/invoice/new" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <PlusCircle size={20} />
            Buat Invoice
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                <th className="p-4 font-semibold">No Invoice</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">Kepada</th>
                <th className="p-4 font-semibold">Total Tagihan</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Belum ada data invoice.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => {
                  let statusBadge = null;
                  if (inv.sisaTagihan === 0) {
                    statusBadge = <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">LUNAS</span>;
                  } else if (inv.dp > 0) {
                    statusBadge = <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">DP</span>;
                  } else {
                    statusBadge = <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">BELUM BAYAR</span>;
                  }

                  return (
                    <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">{inv.invoiceNumber}</td>
                      <td className="p-4 text-gray-600">
                        {format(new Date(inv.date), 'dd MMMM yyyy', { locale: id })}
                      </td>
                      <td className="p-4 text-gray-600">{inv.toName}</td>
                      <td className="p-4 text-gray-900 font-medium">
                        Rp {inv.subTotal.toLocaleString('id-ID')}
                      </td>
                      <td className="p-4 text-center">
                        {statusBadge}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            href={`/invoice/${inv.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Lihat / Cetak"
                          >
                            <FileText size={18} />
                          </Link>
                          <DeleteInvoiceButton id={inv.id} />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
