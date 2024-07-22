import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return new NextResponse(JSON.stringify({ error: 'ProductId is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId, 10) },
      include: { 
        toko: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
