import React from 'react';
import Image from 'next/image';

const GeraiCard = ({ image, name, location, rating, normalPrice, discountPrice, stock }) => {
  return (
    <div className="border rounded-lg shadow-md w-full">
        <div className="relative w-full h-48">
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
                {/* <p className="text-sm text-gray-600">{location}</p> */}
                <p className="text-sm text-gray-600">{rating} ({rating > 4 ? '545 Review' : '559 Review'})</p>
            </div>
            <div className='mb-4'>
                <p className="text-sm text-gray-500 line-through">Rp {normalPrice}</p>
                <p className="text-sm text-black">Rp {discountPrice}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 text-end">{stock} Stok Tersedia</p>
            </div>
            <div className='mt-2'>
                <button className="text-green-500 flex w-full justify-center border border-green-500 rounded-lg p-2 active:bg-green-500 active:text-white hover:bg-green-100" >+ Keranjang</button>
            </div>
        </div>
    </div>
  );
};

export default GeraiCard;
