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

    // Find the tokoId for the given userId
    const userToko = await prisma.userToko.findFirst({
      where: { userId },
      select: { tokoId: true },
    });

    if (!userToko) {
      return new NextResponse(JSON.stringify({ message: 'User is not associated with any toko' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { tokoId } = userToko;

    // Find orders for the tokoId and include buyer and product details
    const orders = await prisma.order.findMany({
      where: {
        orderDetails: {
          some: {
            tokoId,
            status: 'queue', // Only include order details with status 'queue'
          },
        },
      },
      include: {
        user: true, // Include buyer details
        orderDetails: {
          where: {
            tokoId, // Ensure order details belong to the correct tokoId
            status: 'queue', // Only include order details with status 'queue'
          },
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
