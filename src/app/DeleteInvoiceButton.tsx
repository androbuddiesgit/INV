'use client';

import { deleteInvoice } from '@/app/actions';

export default function DeleteInvoiceButton({ id }: { id: string }) {
  const handleDelete = async () => {
    if (confirm('Apakah Anda yakin ingin menghapus invoice ini? Data tidak bisa dikembalikan.')) {
      try {
        await deleteInvoice(id);
      } catch (error) {
        console.error(error);
        alert('Gagal menghapus invoice');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="w-full px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-semibold transition-colors"
      title="Hapus Invoice"
    >
      Hapus
    </button>
  );
}
