import { getServerSession } from 'next-auth';
import prisma from '@/libs/prisma';
import crypto from 'crypto';
import { storage } from '@/libs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const session = await getServerSession({ req });
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');
  const userId = session?.user?.userId;
  // const productId = 3;
  // const userId = 3; //cuman ngecek
  if (!productId) {
    return NextResponse.json({ error: 'ProductId is required' }, { status: 400 });
  }

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const rating = parseInt(formData.get('rating'), 10);
    const komentar = formData.get('komentar');
    const images = formData.getAll('images');
    const fileUrls = [];

    for (const image of images) {
      if (image.size > 0 && image.size <= 10 * 1024 * 1024) { // Check for max size 10 MB
        const buffer = Buffer.from(await image.arrayBuffer());
        const fileName = `${crypto.createHash('md5').update(buffer).digest('hex')}.${image.type.split('/')[1]}`;
        const storageRef = ref(storage, `images/reviews/product${productId}/${fileName}`);
        await uploadBytes(storageRef, buffer, { contentType: image.type });
        const fileUrl = await getDownloadURL(storageRef);
        fileUrls.push(fileUrl);
      }
    }

    const newReview = await prisma.review.create({
      data: {
        rating,
        komentar,
        productId: parseInt(productId, 10),
        userId: parseInt(userId, 10),
        image: fileUrls.join(','), // Store comma-separated URLs
      },
    });

    return NextResponse.json(newReview, { status: 200 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
