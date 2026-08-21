import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InvoiceView from './InvoiceView';
import { getSettings } from '@/app/actions';

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { items: true },
  });

  if (!invoice) {
    notFound();
  }

  const settings = await getSettings();

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <InvoiceView invoice={invoice} settings={settings} />
    </div>
  );
}
