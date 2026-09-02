'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateSettings } from '@/app/actions';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SettingsForm({ initialData }: { initialData: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(initialData.companyLogo || '');
  const [stampPreview, setStampPreview] = useState(initialData.stampLogo || '');

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'companyLogo' | 'stampLogo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue(field, base64String);
        if (field === 'companyLogo') setLogoPreview(base64String);
        if (field === 'stampLogo') setStampPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await updateSettings(data);
      alert('Pengaturan berhasil disimpan!');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan pengaturan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
      
      <div>
        <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Informasi Umum</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Perusahaan</label>
            <input {...register('companyName')} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">No HP / Telp</label>
            <input {...register('companyPhone')} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Alamat Perusahaan</label>
            <textarea {...register('companyAddress')} required className="w-full border rounded-md px-3 py-2" rows={2}></textarea>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Logo Perusahaan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Atas (Header)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, 'companyLogo')} 
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-2">Pilih gambar jika ingin pakai logo asli, atau biarkan kosong / ketik teks (opsional).</p>
            {/* Fallback teks jika tidak ada gambar */}
            <input {...register('companyLogo')} className="mt-2 w-full border rounded-md px-3 py-2 text-sm hidden" />
            
            <div className="mt-4 w-24 h-24 border flex items-center justify-center bg-white rounded-md overflow-hidden">
              {logoPreview && logoPreview.startsWith('data:image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
              ) : logoPreview ? (
                <span className="font-bold text-2xl text-blue-800">{logoPreview}</span>
              ) : (
                <ImageIcon className="text-gray-300" size={32} />
              )}
            </div>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Cap (Tanda Tangan)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, 'stampLogo')} 
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-2">Pilih gambar transparan (.PNG) untuk stempel/cap perusahaan di bagian bawah.</p>
            <input {...register('stampLogo')} className="mt-2 w-full border rounded-md px-3 py-2 text-sm hidden" />
            
            <div className="mt-4 w-24 h-24 border flex items-center justify-center bg-white rounded-md overflow-hidden">
              {stampPreview && stampPreview.startsWith('data:image') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={stampPreview} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <ImageIcon className="text-gray-300" size={32} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Informasi Bank</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Bank</label>
            <input {...register('bankName')} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">No Rekening</label>
            <input {...register('bankAccount')} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Atas Nama</label>
            <input {...register('bankOwner')} required className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 border-b pb-2 mb-4">Penandatangan (Signature)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Petugas</label>
            <input {...register('officerName')} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Jabatan</label>
            <input {...register('officerTitle')} required className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium">
          <ArrowLeft size={20} /> Kembali
        </Link>
        <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
          <Save size={20} />
          {isSubmitting ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>

    </form>
  );
}
