import React from 'react';

const ItemCart = ({ item }) => {
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <input type="checkbox" className="mr-4" />
      <img src={item.product.image} alt={item.product.nama} className="w-16 h-16 rounded mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.product.nama}</h3>
        <p className="text-gray-500 text-sm">{item.product.deskripsi}</p>
        <div className="flex items-center mt-2">
          <button className="text-gray-600 hover:text-gray-800">-</button>
          <input
            type="text"
            value={item.quantity}
            className="w-12 text-center mx-2 border border-gray-300 rounded"
            readOnly
          />
          <button className="text-gray-600 hover:text-gray-800">+</button>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold">Rp {item.product.harga * item.quantity}</p>
        <div className="flex items-center space-x-2 mt-2">
          <button className="text-gray-500 hover:text-red-500">
            <i className="fas fa-heart"></i>
          </button>
          <button className="text-gray-500 hover:text-red-500">
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
