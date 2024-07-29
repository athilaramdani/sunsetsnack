import prisma from '@/libs/prisma';

export const POST = async (req, res) => {
  try {
    const { userId, selectedItems } = await req.json();

    if (!userId || !Array.isArray(selectedItems)) {
      return new Response(JSON.stringify({ message: 'Missing or invalid userId or selectedItems' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const userIdInt = parseInt(userId, 10);

    if (isNaN(userIdInt)) {
      return new Response(JSON.stringify({ message: 'Invalid userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the user already has a cart
    let cart = await prisma.cart.findUnique({
      where: { userId: userIdInt },
      include: { cartItems: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userIdInt,
        },
      });
    }

    // If no items are selected, mark all cart items as not carted
    if (selectedItems.length === 0) {
      await prisma.cartItem.updateMany({
        where: { cartId: cart.cartId },
        data: { carted: false },
      });
    } else {
      // Update each selected item
      for (const item of selectedItems) {
        const productIdInt = parseInt(item.productId, 10);
        if (isNaN(productIdInt)) continue;

        const cartItem = await prisma.cartItem.findFirst({
          where: { cartId: cart.cartId, productId: productIdInt },
        });

        if (cartItem) {
          await prisma.cartItem.update({
            where: { cartItemId: cartItem.cartItemId },
            data: { carted: item.carted },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              carted: item.carted,
              productId: productIdInt,
              cartId: cart.cartId,
            },
          });
        }
      }

      // Mark other items as not carted
      const selectedProductIds = selectedItems.map(item => parseInt(item.productId, 10));
      await prisma.cartItem.updateMany({
        where: {
          cartId: cart.cartId,
          productId: {
            notIn: selectedProductIds,
          },
        },
        data: { carted: false },
      });
    }

    return new Response(JSON.stringify({ message: 'Selected items updated in cart' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
};
