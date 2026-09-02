import { prisma } from '@/lib/prisma';
import InvoiceForm from '../InvoiceForm';

export const dynamic = 'force-dynamic';

export default async function NewInvoicePage() {
  const products = await prisma.product.findMany();
  return <InvoiceForm catalogProducts={products} />;
}
