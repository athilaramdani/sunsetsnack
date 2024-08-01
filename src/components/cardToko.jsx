import React from 'react';
import Image from 'next/image';
import Link from 'next/link'

const CardToko = ({ toko}) => {
  if (!toko) return null;

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-md">
      <Link href={`/geraidetail?tokoId=${toko.tokoId}`}>
        <Image
          src={toko.image || '/images/default-toko.png'}
          alt={`Image of ${toko.nama}`}
          width={200}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-bold mb-2">{toko.nama}</h2>
        <p className="text-gray-500 mb-2">{toko.kota}, {toko.provinsi}</p>
        <p className="text-gray-700">{toko.deskripsi}</p>
      </Link>
    </div>
  );
};

export default CardToko;
