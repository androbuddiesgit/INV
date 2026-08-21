'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Settings, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import DeleteInvoiceButton from './DeleteInvoiceButton';
import { createPelunasan } from '@/app/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DashboardClient({ initialInvoices }: { initialInvoices: any[] }) {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  const handlePelunasan = async (id: string) => {
    if (confirm('Buat invoice pelunasan baru untuk tagihan ini?')) {
      setIsProcessing(id);
      try {
        await createPelunasan(id);
        alert('Invoice Pelunasan berhasil dibuat!');
      } catch (error) {
        console.error(error);
        alert('Gagal membuat pelunasan');
      } finally {
        setIsProcessing(null);
      }
    }
  };

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
                <th className="p-4 font-semibold w-10"></th>
                <th className="p-4 font-semibold">No Invoice</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold">Kepada</th>
                <th className="p-4 font-semibold">Total Tagihan</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {initialInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Belum ada data invoice.
                  </td>
                </tr>
              ) : (
                initialInvoices.map((inv) => {
                  let statusBadge = null;
                  if (inv.isSettled) {
                    statusBadge = <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">LUNAS</span>;
                  } else if (inv.sisaTagihan === 0) {
                    statusBadge = <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">LUNAS</span>;
                  } else if (inv.dp > 0) {
                    statusBadge = <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">DP</span>;
                  } else {
                    statusBadge = <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">BELUM BAYAR</span>;
                  }

                  const isExpanded = expandedRowId === inv.id;

                  return (
                    <React.Fragment key={inv.id}>
                      <tr className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${isExpanded ? 'bg-gray-50/50' : ''}`}>
                        <td className="p-4 cursor-pointer" onClick={() => toggleRow(inv.id)}>
                          <button className="text-gray-400 hover:text-gray-600">
                            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                          </button>
                        </td>
                        <td className="p-4 font-medium text-gray-900 cursor-pointer" onClick={() => toggleRow(inv.id)}>
                          {inv.invoiceNumber}
                        </td>
                        <td className="p-4 text-gray-600">
                          {format(new Date(inv.date), 'dd MMMM yyyy', { locale: localeId })}
                        </td>
                        <td className="p-4 text-gray-600">{inv.toName}</td>
                        <td className="p-4 text-gray-900 font-medium">
                          Rp {inv.subTotal.toLocaleString('id-ID')}
                        </td>
                        <td className="p-4 text-center">
                          {statusBadge}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Tombol PDF View */}
                            <Link
                              href={`/invoice/${inv.id}`}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md text-sm font-semibold transition-colors"
                              title="Lihat / Cetak PDF"
                            >
                              Cetak PDF
                            </Link>

                            {/* Tombol Edit */}
                            <Link
                              href={`/invoice/${inv.id}/edit`}
                              className="px-3 py-1.5 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-md text-sm font-semibold transition-colors"
                              title="Edit Invoice"
                            >
                              Edit
                            </Link>
                            
                            {/* Tombol Hapus */}
                            <DeleteInvoiceButton id={inv.id} />
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Detail Row */}
                      {isExpanded && (
                        <tr className="bg-blue-50/30 border-b border-gray-100">
                          <td colSpan={7} className="p-6">
                            <div className="flex flex-col md:flex-row gap-8">
                              {/* Rincian Items */}
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Item Details</h4>
                                <div className="bg-white border rounded-lg overflow-hidden">
                                  <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b">
                                      <tr>
                                        <th className="p-2 text-left font-medium text-gray-600">Deskripsi</th>
                                        <th className="p-2 text-center font-medium text-gray-600">Qty</th>
                                        <th className="p-2 text-right font-medium text-gray-600">Harga</th>
                                        <th className="p-2 text-right font-medium text-gray-600">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                      {inv.items.map((item: any) => (
                                        <tr key={item.id}>
                                          <td className="p-2 text-gray-700">{item.description}</td>
                                          <td className="p-2 text-center text-gray-700">{item.qty}</td>
                                          <td className="p-2 text-right text-gray-700">{item.price.toLocaleString('id-ID')}</td>
                                          <td className="p-2 text-right font-medium text-gray-800">{item.total.toLocaleString('id-ID')}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Ringkasan & Aksi Pelunasan */}
                              <div className="w-full md:w-64 flex flex-col justify-between">
                                <div className="bg-white p-4 border rounded-lg text-sm space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Sub Total:</span>
                                    <span className="font-medium">Rp {inv.subTotal.toLocaleString('id-ID')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">DP:</span>
                                    <span className="font-medium">Rp {inv.dp.toLocaleString('id-ID')}</span>
                                  </div>
                                  <div className="flex justify-between pt-2 border-t font-bold">
                                    <span className="text-gray-700">Sisa Tagihan:</span>
                                    <span className="text-red-600">Rp {inv.sisaTagihan.toLocaleString('id-ID')}</span>
                                  </div>
                                </div>

                                {/* Tombol Pelunasan (Hanya muncul jika ada sisa tagihan dan belum isSettled) */}
                                {!inv.isSettled && inv.sisaTagihan > 0 && (
                                  <button
                                    onClick={() => handlePelunasan(inv.id)}
                                    disabled={isProcessing === inv.id}
                                    className="mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                                  >
                                    <CheckCircle2 size={18} />
                                    {isProcessing === inv.id ? 'Memproses...' : 'Buat Pelunasan'}
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
