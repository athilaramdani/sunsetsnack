// src/components/PembayaranCard.js
import React from 'react';

const PembayaranCard = ({ cart }) => {
  const { product,quantity } = cart;
  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <div className="flex items-center">
        <img
          src={product.image || "/images/products/delivery-box.png"}
          alt={product.nama}
          className="w-16 h-16 rounded mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{product.nama}</h3>
          <p className="text-gray-600">{quantity}x Rp {product.harga}</p>
        </div>
      </div>
    </div>
  );
};

export default PembayaranCard;
