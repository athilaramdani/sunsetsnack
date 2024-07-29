import prisma from '@/libs/prisma';

export const GET = async (req, res) => {
  try {
    const userId = parseInt(req.headers.get('user-id'), 10);

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
      return new Response(JSON.stringify({ notifications: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ notifications }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
};
