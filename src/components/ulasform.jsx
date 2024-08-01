"use client";
import Image from 'next/image';
import { useState } from 'react';

const UlasForm = ({ orderDetail, userId, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [komentar, setKomentar] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleStarClick = (value) => {
    setRating(value);
  };

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('orderDetailId', orderDetail.orderDetailId);
    formData.append('rating', rating);
    formData.append('komentar', komentar);
    formData.append('userId', userId); // Pastikan userId ditambahkan
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    onSubmit(formData);
  };

  return (
    <div className='border rounded'>
      <form onSubmit={handleSubmit} className="w-96 p-4">
        <div className="flex text-xs gap-4 font-light pb-2">
          <p>{new Date(orderDetail?.date).toLocaleDateString()}</p>
          <p>{orderDetail?.orderId}</p>
        </div>
        <h1 className='font-semibold'>{orderDetail?.product?.nama}</h1>
        <div className='flex items-center gap-4 pt-4'>
          <Image src={orderDetail?.product?.image || "/images/products/delivery-box.png"} width={75} height={75} alt={orderDetail?.product?.nama}/>
          <div className='flex gap-2 flex-col'>
            <h1>{orderDetail?.product?.nama}</h1>
            <div className='flex text-xs'>
              <p>{orderDetail?.kuantitas}x</p>
              <p>Rp.{orderDetail?.product?.harga}</p>
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
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            className='border w-full p-2'
            placeholder='Masukan ulasan anda'
          />
        </div>
        <div className='pt-4'>
          <h1>Upload Gambar</h1>
          <input type="file" multiple onChange={handleImageChange} />
          <div className='flex gap-2 mt-2'>
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} className='w-12 h-12 object-cover' />
            ))}
          </div>
        </div>
        <div className='pt-4 flex justify-end gap-2'>
          <button
            type="button"
            className="border border-green-500 text-green-500 py-2 px-4 rounded hover:bg-green-100"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default UlasForm;
