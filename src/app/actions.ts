'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createInvoice(data: any) {
  const now = new Date(data.date);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  
  const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  const romanMonth = romanMonths[month - 1];

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  // Find the highest invoice number for the month to avoid duplicates if deleted
  const lastInvoice = await prisma.invoice.findFirst({
    where: {
      date: { gte: startDate, lte: endDate },
    },
    orderBy: { createdAt: 'desc' },
  });

  let nextNumber = 1;
  if (lastInvoice && lastInvoice.invoiceNumber) {
    const parts = lastInvoice.invoiceNumber.split('/');
    if (parts.length > 0 && !isNaN(Number(parts[0]))) {
      nextNumber = Number(parts[0]) + 1;
    }
  }
  
  const formattedNumber = nextNumber.toString().padStart(3, '0');
  const invoiceNumber = `${formattedNumber}/INV/${romanMonth}/${year}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = data.items.map((item: any) => ({
    description: item.description,
    qty: Number(item.qty),
    price: Number(item.price),
    total: Number(item.qty) * Number(item.price),
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subTotal = items.reduce((acc: number, curr: any) => acc + curr.total, 0);
  const dp = Number(data.dp) || 0;
  const sisaTagihan = subTotal - dp;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      date: now,
      toName: data.toName,
      toAddress: data.toAddress,
      toContact: data.toContact,
      toPhone: data.toPhone,
      subTotal,
      dp,
      sisaTagihan,
      terbilang: data.terbilang,
      items: { create: items }
    }
  });

  revalidatePath('/dashboard');
  redirect(`/invoice/${invoice.id}`);
}

export async function deleteInvoice(id: string) {
  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: id },
  });
  await prisma.invoice.delete({
    where: { id },
  });
  revalidatePath('/dashboard');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateInvoice(id: string, data: any) {
  // Hitung ulang total
  let subTotal = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = data.items.map((item: any) => {
    const total = Number(item.qty) * Number(item.price);
    subTotal += total;
    return { ...item, total };
  });

  const sisaTagihan = subTotal - Number(data.dp);

  // Update invoice
  await prisma.invoice.update({
    where: { id },
    data: {
      date: new Date(data.date),
      toName: data.toName,
      toAddress: data.toAddress,
      toContact: data.toContact,
      toPhone: data.toPhone,
      subTotal,
      dp: Number(data.dp),
      sisaTagihan,
      terbilang: data.terbilang,
      // Delete old items and replace with new ones
      items: {
        deleteMany: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        create: items.map((item: any) => ({
          description: item.description,
          qty: Number(item.qty),
          price: Number(item.price),
          total: item.total,
        })),
      },
    },
  });

  revalidatePath('/dashboard');
}

export async function createPelunasan(originalInvoiceId: string) {
  const oldInvoice = await prisma.invoice.findUnique({
    where: { id: originalInvoiceId }
  });

  if (!oldInvoice || oldInvoice.sisaTagihan <= 0) return;

  // Generate new Invoice Number
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const romanMonths = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  const romanMonth = romanMonths[month - 1];

  const highestInvoice = await prisma.invoice.findFirst({
    where: {
      invoiceNumber: { endsWith: `/INV/${romanMonth}/${year}` }
    },
    orderBy: { invoiceNumber: 'desc' }
  });

  let nextNumber = 1;
  if (highestInvoice) {
    const parts = highestInvoice.invoiceNumber.split('/');
    const lastNum = parseInt(parts[0], 10);
    if (!isNaN(lastNum)) {
      nextNumber = lastNum + 1;
    }
  }

  const invoiceNumber = `${nextNumber.toString().padStart(3, '0')}/INV/${romanMonth}/${year}`;
  const sisa = oldInvoice.sisaTagihan;

  // Generate new terbilang for pelunasan amount
  const { formatTerbilang } = await import('@/lib/terbilang');
  const terbilangStr = formatTerbilang(sisa);

  // Create Pelunasan Invoice
  await prisma.invoice.create({
    data: {
      invoiceNumber,
      date: new Date(),
      toName: oldInvoice.toName,
      toAddress: oldInvoice.toAddress,
      toContact: oldInvoice.toContact,
      toPhone: oldInvoice.toPhone,
      subTotal: sisa,
      dp: 0,
      sisaTagihan: sisa,
      terbilang: terbilangStr,
      items: {
        create: [
          {
            description: `Pelunasan sisa tagihan untuk Invoice No. ${oldInvoice.invoiceNumber}`,
            qty: 1,
            price: sisa,
            total: sisa
          }
        ]
      }
    }
  });

  // Mark old invoice as settled
  await prisma.invoice.update({
    where: { id: originalInvoiceId },
    data: { isSettled: true }
  });

  revalidatePath('/dashboard');
}

// ========================
// CATALOG / PRODUCT ACTIONS
// ========================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProduct(data: any) {
  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      image: data.image
    }
  });
  revalidatePath('/dashboard');
  revalidatePath('/catalog-admin');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateProduct(id: string, data: any) {
  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      image: data.image
    }
  });
  revalidatePath('/dashboard');
  revalidatePath('/catalog-admin');
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
  revalidatePath('/dashboard');
  revalidatePath('/catalog-admin');
}

export async function getSettings() {
  try {
    let settings = await prisma.setting.findFirst();
    if (!settings) {
      settings = await prisma.setting.create({
        data: {}
      });
    }
    return settings;
  } catch (error) {
    console.error("Database connection failed (likely during build):", error);
    // Return default fallback during Vercel build if DB is unreachable
    return {
      companyName: "NURUL BAROKAH FASHION",
      companyAddress: "Kancana, Kec. Cikijing",
      companyPhone: "+62 823-1526-4784",
      companyLogo: "NB",
      stampLogo: "",
      bankAccount: "1982664820",
      bankName: "Bank BNI Cab Kuningan",
      bankOwner: "Ika Nuraeni",
      officerName: "Eko Maryanto",
      officerTitle: "Marketing Officer",
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateSettings(data: any) {
  await prisma.setting.update({
    where: { id: "default" },
    data: {
      companyName: data.companyName,
      companyAddress: data.companyAddress,
      companyPhone: data.companyPhone,
      companyLogo: data.companyLogo,
      stampLogo: data.stampLogo,
      bankAccount: data.bankAccount,
      bankName: data.bankName,
      bankOwner: data.bankOwner,
      officerName: data.officerName,
      officerTitle: data.officerTitle,
    }
  });
  revalidatePath('/settings');
  revalidatePath('/dashboard');
}
