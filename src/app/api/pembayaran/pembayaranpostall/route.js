import { getServerSession } from 'next-auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getServerSession({ req });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Gunakan userId 2 untuk testing
  const userId = parseInt(req.headers.get('user-id'), 10);

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Missing or invalid userId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { cartItems } = await req.json();
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 });
    }

    // Gunakan alamat dari session atau berikan default value
    const alamat = session.user.alamat || 'Alamat default';
    const tanggalPesanan = new Date();
    const status = 'queue';
    const paymentMethod = 'qris';
    const pengirimanMethod = 'ambil ditempat';

    // Start a transaction
    const newOrder = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          tanggalPesanan,
          alamat,
          userId: parseInt(userId, 10),
          orderDetails: {
            create: cartItems.map(item => ({
              kuantitas: item.quantity,
              subtotal: item.product.harga * item.quantity,
              productId: item.product.productId,
              tokoId: item.product.tokoId,
              status
            })),
          },
          payments: {
            create: {
              tanggalPembayaran: new Date(),
              jumlah: cartItems.reduce((sum, item) => sum + item.product.harga * item.quantity, 0),
              metodePembayaran: paymentMethod,
            },
          },
          pengiriman: {
            create: {
              tanggalPengiriman: tanggalPesanan,
              metodePengiriman: pengirimanMethod,
              statusPengiriman: status,
            },
          },
        },
        include: {
          payments: true,
        },
      });

      // Update product stock
      for (const item of cartItems) {
        await prisma.product.update({
          where: { productId: item.product.productId },
          data: {
            stok: {
              decrement: item.quantity,
            },
          },
        });
      }

      // Find the user's cartId
      const userCart = await prisma.cart.findUnique({
        where: {
          userId: userId,
        },
      });

      if (userCart) {
        // Delete cart items
        await prisma.cartItem.deleteMany({
          where: {
            cartId: userCart.cartId,
            productId: {
              in: cartItems.map(item => item.product.productId),
            },
          },
        });
      }

      return order;
    });

    if (newOrder.payments && newOrder.payments.length > 0) {
      const notificationUrl = `${process.env.BASE_URL}/api/notifications/addnotifications`; // Ensure BASE_URL is set in your environment variables

      await fetch(notificationUrl, {
        method: 'POST',
        body: JSON.stringify({
          title: 'Pembayaran Selesai',
          message: `Pembayaran berhasil untuk order ${newOrder.orderId}. Total pembayaran: ${newOrder.payments[0].jumlah}.`,
          userId: userId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return NextResponse.json(newOrder, { status: 200 });
  } catch (error) {
    console.error('Error pembelian:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
