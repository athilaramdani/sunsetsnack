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
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId: parseInt(userId, 10) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const formData = await req.formData();
    const nama = formData.get('nama') || null;
    const username = formData.get('username') || null;
    const no_telp = formData.get('no_telp') || null;
    const image = formData.get('image');
    let fileUrl = null;

    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const fileName = `${crypto.createHash('md5').update(buffer).digest('hex')}.${image.type.split('/')[1]}`;
      const storageRef = ref(storage, `images/users/${fileName}`);
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

    const updatedUser = await prisma.user.update({
      where: { userId: parseInt(userId, 10) },
      data: {
        nama,
        username,
        no_telp,
        ...(fileUrl && { image: fileUrl }),
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user settings:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
