import prisma from '@/libs/prisma';

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {
  try {
    const url = new URL(req.url);
    const userId = parseInt(url.searchParams.get('user-id'), 10);

    if (!userId) {
      return new Response(JSON.stringify({ message: 'Missing or invalid userId' }), {
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

    return new Response(JSON.stringify(orders), {
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
