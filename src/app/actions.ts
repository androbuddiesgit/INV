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

  revalidatePath('/');
  redirect(`/invoice/${invoice.id}`);
}

export async function deleteInvoice(id: string) {
  await prisma.invoice.delete({ where: { id } });
  revalidatePath('/');
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
  revalidatePath('/');
}
