import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tokoId = searchParams.get('tokoId');

  if (!tokoId) {
    return new NextResponse(JSON.stringify({ error: 'tokoId is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
//dah aman
  try {
    const toko = await prisma.toko.findUnique({
      where: { tokoId: parseInt(tokoId, 10) },
      include: { 
        products: true,
        orderDetails: true, 
      },
    });

    if (!toko) {
      return new NextResponse(JSON.stringify({ error: 'Toko not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify(toko), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching toko' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
