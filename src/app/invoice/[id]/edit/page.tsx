import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InvoiceForm from '../../InvoiceForm';

export default async function EditInvoicePage({ params }: { params: { id: string } }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  // Format the date to YYYY-MM-DD for the date picker
  const formattedDate = new Date(invoice.date).toISOString().split('T')[0];
  
  const initialData = {
    ...invoice,
    date: formattedDate,
  };

  const products = await prisma.product.findMany();

  return <InvoiceForm initialData={initialData} catalogProducts={products} />;
}
