// src/components/PurchaseList.js
import React from 'react';

const PurchaseList = ({ date, id, store, name, price }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">{date}  {id}</div>
      </div>
      <div className="flex items-center">
        <img
          src="/images/products/delivery-box.png" // Ganti dengan path gambar item yang sesuai
          alt={name}
          className="w-16 h-16 rounded mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{store}</h3>
          <p>{name}</p>
          <p className="text-gray-600">1x {price}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Beli Lagi
          </button>
          <button className="border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-100">
            Ulas
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;
