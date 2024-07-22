import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(req) {
  const formData = await req.formData();

  const nama = formData.get("nama") || null;
  const provinsi = formData.get("provinsi") || null;
  const kota = formData.get("kota") || null;
  const alamat = formData.get("alamat") || null;
  const userId = formData.get("userId") ? parseInt(formData.get("userId")) : null;

  if (!nama || !provinsi || !kota || !alamat || !userId) {
    console.log(formData)
    return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { userId: userId }, // Disesuaikan dengan skema revisi
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Create toko
    const toko = await prisma.toko.create({
      data: {
        nama,
        provinsi,
        kota,
        alamat,
        users: {
          create: {
            user: {
              connect: { userId: userId }, // Disesuaikan dengan skema revisi
            },
            role: 'admin', // Set the user role as admin
          },
        },
      },
    });

    // Update user roleToko to 'admin' and role to 'PENJUAL'
    await prisma.user.update({
      where: { userId: userId }, // Disesuaikan dengan skema revisi
      data: {
        roleToko: 'admin',
        role: 'PENJUAL',
      },
    });

    return NextResponse.json({ toko }, { status: 201 });
  } catch (e) {
    console.error("Error while trying to create toko\n", e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
