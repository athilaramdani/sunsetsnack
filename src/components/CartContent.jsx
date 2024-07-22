import React from 'react';

const CartItem = ({ image, nama, deskrpsi, quantity, harga }) => {
  console.log(image,nama,deskrpsi,quantity,harga)
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center">
        <img src={image} alt={nama} className="w-12 h-12 mr-4 rounded" />
        <div>
          <h2 className="text-lg font-semibold">{nama}</h2>
          <p className="text-gray-500">{deskrpsi}</p>
        </div>
      </div>
      <div className="text-right">
        <p>{quantity} x Rp {harga}</p>
      </div>
    </div>
  );
};

export default CartItem;
