import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MPCard = ({ image, name, location, rating, normalPrice, discountPrice, stock }) => {
  return (
    <div className="border rounded-lg shadow-md">
        <Link href="/geraidetail">
            <div className="relative w-full h-56">
                <Image
                    src={image}
                    alt={name}
                    layout='fill'
                    objectFit='cover'
                    className="rounded-t-lg" />
            </div>
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
        </Link>
    </div>
  );
};

export default MPCard;