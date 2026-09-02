import { prisma } from '@/lib/prisma';
import CatalogClient from './CatalogClient';

export const dynamic = 'force-dynamic';

export default async function CatalogAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <CatalogClient initialProducts={products} />
    </div>
  );
}
