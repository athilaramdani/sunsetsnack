import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/libs/auth';
import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userId = parseInt(session.user.userId, 10);

    const userToko = await prisma.userToko.findMany({
      where: {
        userId: userId,
      },
      include: {
        toko: {
          include: {
            products: {
              include: {
                reviews : true,
              }
            }
          },
        },
      },
    });

    if (userToko.length === 0) {
      return NextResponse.json({ error: 'Toko not found' }, { status: 404 });
    }

    const toko = userToko[0].toko; // Mengambil toko pertama yang ditemukan
    const { tokoId, nama, provinsi, kota, alamat, products, image, deskripsi, users } = toko;

    return NextResponse.json({ tokoId, nama, provinsi, kota, alamat, products,image, deskripsi, users }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Toko:', error);
    return NextResponse.json({ error: 'Error fetching Toko' }, { status: 500 });
  }
}
