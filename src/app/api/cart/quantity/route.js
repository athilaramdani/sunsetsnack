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

    // Check if the user already has a cart
    let cart = await prisma.cart.findUnique({
      where: { userId: userIdInt },
      include: { cartItems: true },
    });

    if (!cart) {
      // Create a new cart for the user if not exist
      cart = await prisma.cart.create({
        data: {
          userId: userIdInt,
        },
      });
    }

    // Check if the product is already in the cart
    const cartItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.cartId, productId: parseInt(productId, 10) },
    });

    if (cartItem) {
      // Update the quantity if the product is already in the cart
      await prisma.cartItem.update({
        where: { cartItemId: cartItem.cartItemId },
        data: { quantity: cartItem.quantity + 1 },
      });
    } else {
      // Add the product to the cart if it's not there yet
      await prisma.cartItem.create({
        data: {
          quantity: 1,
          productId: parseInt(productId, 10),
          cartId: cart.cartId,
        },
      });
    }

    return new Response(JSON.stringify({ message: 'Product added to cart' }), {
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
