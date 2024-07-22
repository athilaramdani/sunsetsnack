"use client";
import { useState, useEffect } from 'react';

const UlasForm = () => {
  const [rating, setRating] = useState(5); // Default to 5 stars

  // Function to handle clicking a star
  const handleStarClick = (value) => {
    setRating(value);
  };

  // Function to generate stars based on the rating value
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          className={`text-xl cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='border'>
      <div className="w-96 p-4">
        <div className="flex text-xs gap-4 font-light pb-2">
          <p>8 Juni 2024</p>
          <p>SS4498</p>
        </div>
        <h1 className='font-semibold'>Dunkin Donuts Cabang Kemang</h1>
        <div className='flex items-center gap-4 pt-4'>
          <h1>GAMBAR</h1>
          <div className='flex gap-2 flex-col'>
            <h1>Standard Mystery Pack 1</h1>
            <div className='flex text-xs'>
              <p>1x</p>
              <p>Rp.18000</p>
            </div>
          </div>
        </div>
        <div className='pt-4'>
          <h1>Rating</h1>
          <div className='flex gap-1'>
            {renderStars(rating)}
          </div>
        </div>
        <div className='pt-4'>
          <h1>Ulasan</h1>
          <textarea
            type='text'
            className='border w-full p-2'
            placeholder='Masukan ulasan anda'
          />
        </div>
        <div className='pt-4 flex justify-end gap-2'>
          <button
            className="border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-100"
          >
            Batal
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default UlasForm;
