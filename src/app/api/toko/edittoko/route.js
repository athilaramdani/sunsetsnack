import { getServerSession } from 'next-auth';
import prisma from '@/libs/prisma';
import crypto from 'crypto';
import { storage } from '@/libs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

// POST handler
export async function POST(req) {
  const session = await getServerSession({ req });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const tokoId = searchParams.get('tokoId');

  if (!tokoId) {
    return NextResponse.json({ error: 'tokoId is required' }, { status: 400 });
  }

  try {
    const toko = await prisma.toko.findUnique({
      where: { tokoId: parseInt(tokoId, 10) },
    });

    if (!toko) {
      return NextResponse.json({ error: 'Toko not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const nama = formData.get('nama') || null;
    const provinsi = formData.get('provinsi') || null;
    const kota = formData.get('kota') || null;
    const alamat = formData.get('alamat') || null;
    const deskripsi = formData.get('deskripsi') || null;
    const image = formData.get('image');
    let fileUrl = null;

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${crypto.createHash('md5').update(buffer).digest('hex')}.${image.type.split('/')[1]}`;
      const storageRef = ref(storage, `images/toko/${fileName}`);
      try {
        await uploadBytes(storageRef, buffer, {
          contentType: image.type,
        });
        fileUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error('Error uploading file to Firebase Storage:', error);
        return NextResponse.json({ error: 'Error uploading file.' }, { status: 500 });
      }
    }

    const updatedToko = await prisma.toko.update({
      where: { tokoId: parseInt(tokoId, 10) },
      data: {
        nama,
        provinsi,
        kota,
        alamat,
        deskripsi,
        ...(fileUrl && { image: fileUrl }),
      },
    });

    return NextResponse.json(updatedToko, { status: 200 });
  } catch (error) {
    console.error('Error updating toko settings:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
