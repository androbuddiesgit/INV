'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { createInvoice, updateInvoice } from '@/app/actions';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatTerbilang } from '@/lib/terbilang';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function InvoiceForm({ initialData, catalogProducts = [] }: { initialData?: any, catalogProducts?: any[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData || {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subTotal = watchItems.reduce((acc: number, curr: any) => acc + (Number(curr.qty) * Number(curr.price)), 0);
  const sisaTagihan = subTotal - Number(watchDp);

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
        phone = '+62 ' + phone.slice(1, 4) + '-' + phone.slice(4);
      }
      data.toPhone = phone;
    }

    try {
      if (initialData?.id) {
        await updateInvoice(initialData.id, data);
      } else {
        await createInvoice(data);
      }
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Gagal memproses invoice');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium mb-6 transition-colors">
        <ArrowLeft size={20} /> Kembali ke Dashboard
      </Link>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
          {initialData ? 'Edit Invoice' : 'Buat Invoice Baru'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input type="date" {...register('date')} required className="w-full border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">Kepada (Klien)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nama / Perusahaan</label>
                <input {...register('toName')} required className="w-full border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Kontak Person</label>
                <input {...register('toContact')} className="w-full border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Opsional" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">Alamat</label>
                <textarea {...register('toAddress')} required className="w-full border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" rows={2}></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">No HP</label>
                <input {...register('toPhone')} required className="w-full border-gray-300 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Detail Item</h3>
            </div>
            
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-3 items-start bg-white p-4 border border-gray-200 rounded-lg shadow-sm relative">
                  
                  {/* Catalog Selector */}
                  {catalogProducts && catalogProducts.length > 0 && (
                    <div className="w-full sm:w-1/3">
                      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Pilih dari Katalog (Opsional)</label>
                      <select 
                        className="w-full border-gray-300 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm"
                        onChange={(e) => {
                          const prod = catalogProducts.find(p => p.id === e.target.value);
                          if (prod) {
                            setValue(`items.${index}.description`, prod.name + (prod.description ? `\n${prod.description}` : ''));
                            setValue(`items.${index}.price`, prod.price);
                          }
                        }}
                      >
                        <option value="">-- Ketik manual atau pilih --</option>
                        {catalogProducts.map(p => (
                          <option key={p.id} value={p.id}>{p.name} (Rp {p.price.toLocaleString('id-ID')})</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Deskripsi / Detail Barang</label>
                    <textarea 
                      {...register(`items.${index}.description`)} 
                      placeholder="Tekan Enter untuk membuat 1 Set barang dengan harga yang sama..." 
                      required 
                      rows={2}
                      className="w-full border-gray-300 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm" 
                    />
                  </div>
                  <div className="w-full sm:w-20">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Qty</label>
                    <input 
                      type="number" 
                      {...register(`items.${index}.qty`)} 
                      min="1" 
                      required 
                      className="w-full border-gray-300 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                    />
                  </div>
                  <div className="w-full sm:w-40">
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Harga (Rp)</label>
                    <input 
                      type="number" 
                      {...register(`items.${index}.price`)} 
                      min="0" 
                      required 
                      className="w-full border-gray-300 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                    />
                  </div>
                  {fields.length > 1 && (
                    <button 
                      type="button" 
                      onClick={() => remove(index)} 
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-5 sm:mt-5"
                      title="Hapus baris ini"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={() => append({ description: '', qty: 1, price: 0 })}
              className="mt-4 flex items-center gap-2 text-blue-600 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={18} /> Tambah Baris
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex flex-col md:flex-row gap-6 justify-end">
              <div className="w-full md:w-1/2 space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Sub Total:</span>
                  <span className="font-semibold text-gray-900">Rp {subTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">DP (Uang Muka):</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Rp</span>
                    <input 
                      type="number" 
                      {...register('dp')} 
                      min="0" 
                      className="w-32 border-gray-300 border rounded-lg px-3 py-2 text-right outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-800">Sisa Tagihan:</span>
                  <span className="text-blue-600">Rp {sisaTagihan.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm text-gray-600 mb-1">Terbilang (Otomatis)</label>
              <textarea 
                {...register('terbilang')} 
                readOnly
                className="w-full border-gray-300 border rounded-lg px-4 py-3 bg-gray-50 text-gray-700 italic outline-none" 
                rows={2}
              ></textarea>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Menyimpan...' : (initialData ? 'Simpan Perubahan' : 'Buat Invoice Sekarang')}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
