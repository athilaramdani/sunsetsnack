import { getServerSession } from 'next-auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Find the user's Toko based on the user's ID
    const userToko = await prisma.userToko.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        toko: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!userToko || !userToko.toko) {
      return NextResponse.json({ error: 'Toko not found' }, { status: 404 });
    }

    // Extract the necessary fields to return to the frontend
    const { id, nama, provinsi, kota, alamat, products } = userToko.toko;

    return NextResponse.json({ id, nama, provinsi, kota, alamat,products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Toko:', error);
    return NextResponse.json({ error: 'Error fetching Toko' }, { status: 500 });
  }
}
