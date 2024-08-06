import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MPCard = ({ image, name, toko, reviews, normalPrice, discountPrice, stock, productId }) => {
  const averageRating = reviews?.length
    ? (reviews.reduce((total, review) => total + review.rating, 0) / reviews.length).toFixed(2)
    : 0.00;

  return (
    <div className="group border rounded-lg shadow-md transition duration-300 hover:shadow-xl overflow-hidden w-40 md:w-72">
      <Link href={`/productpage?productId=${productId}`}>
        {image ? (
          <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden rounded-t-lg">
            <Image
              src={image}
              alt={name}
              layout='fill'
              objectFit='cover'
              className="transition-transform duration-300 transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="animate-pulse flex items-center justify-center h-48 sm:h-56 md:h-64 lg:h-80 bg-gray-200">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          </div>
        )}
        <div className='p-4 bg-white'>
          {name ? (
            <div className='mb-4'>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="text-sm text-gray-600">{toko?.nama}</p>
              <p className="text-sm text-gray-600">Rating: {averageRating} ({reviews?.length} ulasan)</p>
            </div>
          ) : (
            <div className="animate-pulse space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          )}
          {normalPrice && discountPrice ? (
            <div className='mb-4'>
              <p className="text-sm text-gray-500 line-through">Rp {normalPrice}</p>
              <p className="text-sm text-black">Rp {discountPrice}</p>
            </div>
          ) : (
            <div className="animate-pulse space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          )}
          {stock ? (
            <div>
              <p className="text-sm text-gray-500 text-end">{stock > 0 ? `${stock} Stok Tersedia` : 'Stok Habis'}</p>
            </div>
          ) : (
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3 ml-auto"></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MPCard;
