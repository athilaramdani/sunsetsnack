import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = parseInt(searchParams.get('productId'), 10);

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: {
        productId: productId,
      },
      include: {
        toko: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const toko = product.toko;
    const { tokoId, nama, provinsi, kota, alamat, products } = toko;

    return NextResponse.json({ tokoId, nama, provinsi, kota, alamat, products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Toko:', error);
    return NextResponse.json({ error: 'Error fetching Toko' }, { status: 500 });
  }
}
