import prisma from '@/libs/prisma';
import crypto from 'crypto';
import { storage } from '@/libs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const userId = parseInt(req.headers.get('user-id'), 10);

  if (!userId) {
    return new Response(JSON.stringify({ message: 'Missing or invalid userId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const formData = await req.formData();
  const orderDetailId = formData.get('orderDetailId');
  const rating = parseInt(formData.get('rating'), 10);
  const komentar = formData.get('komentar');
  const images = formData.getAll('images');
  const fileUrls = [];

  if (!orderDetailId) {
    return NextResponse.json({ error: 'orderDetailId is required' }, { status: 400 });
  }

  try {
    const orderDetail = await prisma.orderDetail.findUnique({
      where: { orderDetailId: parseInt(orderDetailId, 10) },
      select: { productId: true }
    });

    if (!orderDetail) {
      return NextResponse.json({ error: 'Invalid orderDetailId' }, { status: 400 });
    }

    const productId = orderDetail.productId;

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
        productId,
        userId,
        image: fileUrls.join(','), // Store comma-separated URLs
      },
    });

    // Update the rated status of the orderDetail
    await prisma.orderDetail.update({
      where: { orderDetailId: parseInt(orderDetailId, 10) },
      data: { rated: true },
    });

    return NextResponse.json(newReview, { status: 200 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
