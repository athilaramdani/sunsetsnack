import prisma from '@/libs/prisma';

export const POST = async (req, res) => {
  try {
    const { orderDetailId } = await req.json();

    if (!orderDetailId) {
      return new Response(JSON.stringify({ message: 'Missing or invalid orderDetailId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch order detail to get the quantity and productId
    const orderDetail = await prisma.orderDetail.findUnique({
      where: { orderDetailId },
      include: { product: true },  // Include product details
    });

    if (!orderDetail) {
      return new Response(JSON.stringify({ message: 'Order detail not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { productId, kuantitas } = orderDetail;

    // Update the order status to 'finish'
    await prisma.orderDetail.update({
      where: { orderDetailId },
      data: { status: 'finish' },
    });

    // Increment the 'terjual' field in the product
    await prisma.product.update({
      where: { productId },
      data: { terjual: { increment: kuantitas } },
    });

    return new Response(JSON.stringify({ message: 'Order status updated to finish and product sales incremented' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
};
