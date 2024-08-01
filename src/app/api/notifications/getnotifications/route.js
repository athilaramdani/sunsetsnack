import prisma from '@/libs/prisma';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
  const requestHeaders = headers();
  try {
    const userId = parseInt(requestHeaders.get('user-id'), 10);

    if (!userId) {
      return new Response(JSON.stringify({ message: 'Missing or invalid userId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { tanggalnotifikasi: 'desc' }, // Optional: Sort by the notification date
    });

    if (!notifications) {
      return new NextResponse(JSON.stringify({ notifications: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify({ notifications }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
};
