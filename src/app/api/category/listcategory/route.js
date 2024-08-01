import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const category = [
        "Makanan Berat", "Makanan Ringan", "Camilan"
      ];
      return new NextResponse(JSON.stringify(category), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Error fetching category' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  