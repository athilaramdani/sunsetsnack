import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MPCard = ({ image, name, toko, rating, normalPrice, discountPrice, stock, productId }) => {
  return (
    <div className="group border rounded-lg shadow-md transition duration-300 hover:shadow-xl overflow-hidden">
      <Link href={`/productpage?productId=${productId}`}>
        <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={name}
            layout='fill'
            objectFit='cover'
            className="transition-transform duration-300 transform group-hover:scale-105"
          />
        </div>
        <div className='p-4 bg-white'>
          <div className='mb-4'>
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-gray-600">{toko}</p>
            <p className="text-sm text-gray-600">{rating} ({rating > 4 ? '545 Review' : '559 Review'})</p>
          </div>
          <div className='mb-4'>
            <p className="text-sm text-gray-500 line-through">Rp {normalPrice}</p>
            <p className="text-sm text-black">Rp {discountPrice}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 text-end">{stock} Stok Tersedia</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MPCard;
