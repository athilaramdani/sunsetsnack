import prisma from '@/libs/prisma';

export const POST = async (req, res) => {
  try {
    const { productId, userId } = await req.json();

    if (!productId || !userId) {
      return new Response(JSON.stringify({ message: 'Missing productId or userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userIdInt = parseInt(userId, 10);
    const productIdInt = parseInt(productId, 10);

    // Find the user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId: userIdInt },
      include: { cartItems: true },
    });

    if (!cart) {
      return new Response(JSON.stringify({ message: 'Cart not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Find the cart item
    const cartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.cartId, productId: productIdInt },
    });

    if (!cartItem) {
      return new Response(JSON.stringify({ message: 'Cart item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Remove the cart item
    await prisma.cartItem.delete({
      where: { cartItemId: cartItem.cartItemId },
    });

    return new Response(JSON.stringify({ message: 'Product removed from cart' }), {
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
