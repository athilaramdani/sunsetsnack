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
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId, 10) },
      include: { user: true }, // Include user data for review
    });

    return new NextResponse(JSON.stringify(reviews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new NextResponse(JSON.stringify({ error: 'Error fetching reviews' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
