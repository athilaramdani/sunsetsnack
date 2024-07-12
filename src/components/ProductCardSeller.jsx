import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-4">
      <img src={product.image} alt={product.image} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">{product.nama}</h3>
      <p className="text-gray-600 mb-2">{product.deskripsi}</p>
      <p className="text-gray-800 font-semibold">{product.harga}</p>
      {product.harga && ( //product rating
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
          {product.harga}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
