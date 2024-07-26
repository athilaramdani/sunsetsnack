import React from 'react';

const PurchaseList = ({ item, onUlasClick }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">{item?.date} {item?.orderId}</div>
      </div>
      <div className="flex items-center">
        <img
          src="/images/products/delivery-box.png"
          alt={item?.name}
          className="w-16 h-16 rounded mr-4"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{item?.store}</h3>
          <p>{item?.name}</p>
          <p className="text-gray-600">{item?.quantity}x {item?.price}</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
            Beli Lagi
          </button>
          <button
            className="border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-100"
            onClick={onUlasClick}
          >
            Ulas
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;
