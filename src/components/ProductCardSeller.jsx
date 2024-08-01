import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  // Menghitung rata-rata rating produk
  const averageRating = product.reviews?.length
    ? (product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length).toFixed(2)
    : 0.00;

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mb-4 w-96">
      <img src={product.image || "/images/products/delivery-box.png"} alt={product.nama} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2">{product.nama}</h3>
      <p className="text-gray-600 mb-2">{product.deskripsi}</p>
      <p className="text-gray-800 font-semibold">{product.harga}</p>
        <div className="mt-2 flex flex-row justify-between">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
            <p>{averageRating}</p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button className="text-gray-500 hover:text-blue-500">
              <FontAwesomeIcon icon={faPencil}/>
            </button>
            <button className="text-gray-500 hover:text-red-500">
              <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
