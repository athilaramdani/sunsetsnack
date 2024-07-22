// src/components/PurchaseList.js
import React from 'react';

const PembayaranCard = ({ date, orderId, store, name, price }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">{date}  {orderId}</div>
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
      </div>
    </div>
  );
};

export default PembayaranCard;
