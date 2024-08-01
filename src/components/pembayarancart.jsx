import React from 'react';

const PembayaranCart = ({ total, togglePembayaran }) => {
  return (
    <div>
      <div className="border rounded-lg p-4 bg-white shadow w-full">
        <h2 className="text-lg font-semibold mb-4">Ringkasan Belanja</h2>
        <div className="flex justify-between mb-4">
          <span>Total</span>
          <span className="font-semibold">{total}</span>
        </div>
        <button onClick={togglePembayaran} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Bayar
        </button>
      </div>
    </div>
  );
};

export default PembayaranCart;
