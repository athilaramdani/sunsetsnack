import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { title, message, userId } = await req.json();

    if (!title || !message || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newNotification = await prisma.notification.create({
      data: {
        judul: title,
        pesan: message,
        tanggalnotifikasi: new Date(),
        userId: parseInt(userId, 10),
      },
    });

    return NextResponse.json(newNotification, { status: 200 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
