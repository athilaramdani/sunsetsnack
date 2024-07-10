import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import crypto from 'crypto';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
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
  const formData = await req.formData();

  const nama = formData.get("nama") || null;
  const deskripsi = formData.get("deskripsi") || null;
  const harga = formData.get("harga") ? parseFloat(formData.get("harga")) : null;
  const stok = formData.get("stok") ? parseInt(formData.get("stok")) : null;
  const kategori = formData.get("kategori") || null;
  const tokoId = formData.get("tokoId") ? parseInt(formData.get("tokoId")) : null;
  const image = formData.get("image");

  let fileUrl = null;
  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/images/products/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error("Error while trying to create directory when uploading a file\n", e);
        return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
      }
    }

    try {
      const hash = crypto.createHash('md5').update(buffer).digest('hex');
      const extension = mime.extension(image.type);
      const filename = `${hash}.${extension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      fileUrl = `${relativeUploadDir}/${filename}`;
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
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
}
