'use client';

import { Trash2 } from 'lucide-react';
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
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Hapus Invoice"
    >
      <Trash2 size={18} />
    </button>
  );
}
