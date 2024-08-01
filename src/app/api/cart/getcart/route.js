import prisma from '@/libs/prisma';
import { headers } from 'next/headers';

export const GET = async (req) => {
  try {
    const userId = parseInt(headers().get('user-id'), 10);

    if (!userId) {
      return new Response(JSON.stringify({ message: 'Missing or invalid userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                toko: true,
              }
            }
          },
        },
      },
    });

    if (!cart) {
      return new Response(JSON.stringify({ cartItems: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
};
