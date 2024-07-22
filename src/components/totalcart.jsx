import React from 'react';
import Link from 'next/link';

const TotalCart = ({ total }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Ringkasan Belanja</h2>
      <div className="flex justify-between mb-4">
        <span>Total</span>
        <span className="font-semibold">{total}</span>
      </div>
      <Link href='/pembayaran'>
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Bayar
        </button>
      </Link>
    </div>
  );
};

export default TotalCart;
