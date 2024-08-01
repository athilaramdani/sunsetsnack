import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { storage } from '@/libs/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { 
        toko: true,
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Error fetching products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(req) {
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
            products: true,
          },
        },
      },
    });

    if (userToko.length === 0) {
      return NextResponse.json({ error: 'Toko not found' }, { status: 404 });
    }

    const toko = userToko[0].toko; // Mengambil toko pertama yang ditemukan
    const formData = await req.formData();

    const nama = formData.get("nama") || null;
    const deskripsi = formData.get("deskripsi") || null;
    const harga = formData.get("harga") ? parseFloat(formData.get("harga")) : null;
    const stok = formData.get("stok") ? parseInt(formData.get("stok")) : null;
    const kategori = formData.get("kategori") || null;
    const tokoId = toko.tokoId; // Disesuaikan dengan skema revisi
    const image = formData.get("image");
    let fileUrl = null;

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${crypto.createHash('md5').update(buffer).digest('hex')}.${image.type.split('/')[1]}`;
      const storageRef = ref(storage, `images/products/${fileName}`);
      try {
        await uploadBytes(storageRef, buffer, {
          contentType: image.type,
        });
        fileUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading file to Firebase Storage", error);
        return NextResponse.json({ error: "Error uploading file." }, { status: 500 });
      }
    }

    try {
      const result = await prisma.product.create({
        data: {
          nama,
          deskripsi,
          harga,
          stok,
          kategori,
          tokoId,
          image: fileUrl,
        },
      });

      return NextResponse.json({ product: result }, { status: 201 });
    } catch (e) {
      console.error("Error while trying to save product\n", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching Toko:', error);
    return NextResponse.json({ error: 'Error fetching Toko' }, { status: 500 });
  }
}
