'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { createInvoice } from '@/app/actions';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatTerbilang } from '@/lib/terbilang';

export default function NewInvoicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      toName: '',
      toAddress: '',
      toContact: '',
      toPhone: '',
      items: [{ description: '', qty: 1, price: 0 }],
      dp: 0,
      terbilang: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const watchItems = watch('items');
  const watchDp = watch('dp');

  const subTotal = watchItems.reduce((acc, curr) => acc + (Number(curr.qty) * Number(curr.price)), 0);
  const sisaTagihan = subTotal - Number(watchDp);

  // Auto update terbilang when subtotal changes
  useEffect(() => {
    setValue('terbilang', formatTerbilang(subTotal));
  }, [subTotal, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Auto-format phone number
    if (data.toPhone) {
      let phone = data.toPhone.trim();
      if (phone.startsWith('0')) {
        // Format: 089123456 -> +62 891-23456
        phone = '+62 ' + phone.slice(1, 4) + '-' + phone.slice(4);
      }
      data.toPhone = phone;
    }

    try {
      await createInvoice(data);
    } catch (error) {
      console.error(error);
      alert('Gagal membuat invoice');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Buat Invoice Baru</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        
        {/* Header Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Informasi Kepada</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nama Perusahaan / Klien *</label>
              <input {...register('toName')} required className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="PT Mitra Sigma Tekindo" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Alamat *</label>
              <textarea {...register('toAddress')} required className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Majalengka" rows={2}></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kontak Person</label>
                <input {...register('toContact')} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Bapak Hamdan" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">No HP</label>
                <input {...register('toPhone')} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="+62 821-..." />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 border-b pb-2">Pengaturan Invoice</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Tanggal *</label>
              <input type="date" {...register('date')} required className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Daftar Barang/Jasa</h3>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col md:flex-row gap-3 items-end border p-3 rounded-lg bg-gray-50/50">
                <div className="flex-1 w-full">
                  <label className="block text-sm text-gray-600 mb-1">Deskripsi</label>
                  <input {...register(`items.${index}.description` as const)} required className="w-full border rounded-md px-3 py-2" placeholder="Masker / Ciput" />
                </div>
                <div className="w-full md:w-24">
                  <label className="block text-sm text-gray-600 mb-1">Qty</label>
                  <input type="number" {...register(`items.${index}.qty` as const)} required className="w-full border rounded-md px-3 py-2" min="1" />
                </div>
                <div className="w-full md:w-40">
                  <label className="block text-sm text-gray-600 mb-1">Harga (Rp)</label>
                  <input type="number" {...register(`items.${index}.price` as const)} required className="w-full border rounded-md px-3 py-2" min="0" />
                </div>
                <div className="w-full md:w-auto pb-1">
                  <button type="button" onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors" title="Hapus baris">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ description: '', qty: 1, price: 0 })} className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <Plus size={16} /> Tambah Baris
          </button>
        </div>

        {/* Summary & Terbilang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Terbilang</label>
            <textarea {...register('terbilang')} className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enam Juta Tiga Ratus Delapan Puluh Ribu Rupiah" rows={2}></textarea>
          </div>
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-gray-600">
              <span>Sub Total</span>
              <span className="font-medium">Rp {subTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span>DP / Pembayaran Awal</span>
              <div className="w-40">
                <input type="number" {...register('dp')} className="w-full border rounded-md px-3 py-1 text-right" min="0" />
              </div>
            </div>
            <div className="flex justify-between text-gray-900 font-bold text-lg pt-2 border-t">
              <span>Sisa Tagihan</span>
              <span>Rp {sisaTagihan.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50">
            {isSubmitting ? 'Menyimpan...' : 'Simpan Invoice'}
          </button>
        </div>
      </form>
    </div>
  );
}
