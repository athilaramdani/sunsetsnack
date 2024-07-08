import React from 'react';
import Image from 'next/image';

const MPCard = ({ image, name, location, rating, normalPrice, discountPrice, stock }) => {
  return (
    <div className="border rounded-lg shadow-md">
        <Image src={image} alt={name} width={400} height={300} className="w-full h-33 object-cover rounded-md" />
        <div className='p-4'>
            <div className='mb-4'>
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm text-gray-600">{location}</p>
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
    </div>
  );
};

export default MPCard;