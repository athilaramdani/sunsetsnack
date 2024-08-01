import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return new NextResponse(JSON.stringify({ error: 'q parameter is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        nama: {
          contains: q,
        },
      },
      include: {
        toko: true,
        reviews: true,
      },
    });

    const toko = await prisma.toko.findMany({
      where: {
        nama: {
          contains: q,
        },
      },
      include: {
        users: true,
      },
    });

    return new NextResponse(JSON.stringify({ products, toko }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error); // Log the error
    return new NextResponse(JSON.stringify({ error: 'Error fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
