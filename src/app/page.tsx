import { prisma } from '@/lib/prisma';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let invoices: any[] = [];
  try {
    invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
  } catch (error) {
    console.error("Database connection failed during build:", error);
  }

  return (
    <main>
      <DashboardClient initialInvoices={invoices} />
    </main>
  );
}
