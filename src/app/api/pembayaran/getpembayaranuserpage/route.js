import prisma from '@/libs/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
export const GET = async (req, res) => {
  const requestHeaders = headers();
  try {
    const userId = parseInt(requestHeaders.get('user-id'), 10);

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: 'Missing or invalid userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find orders for the specific userId
    const orders = await prisma.order.findMany({
      where: {
        userId, // Filter by userId
      },
      include: {
        user: true, // Include user (buyer) details
        orderDetails: {
          include: {
            product: true, // Include product details
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
};
