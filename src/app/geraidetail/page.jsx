"use client"
import GeraiCard from '@/components/geraicard';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import { useEffect, useState } from 'react';

const GeraiDetail = () => {
  const [cardsData, setCardsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCardsData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='pb-20'>
        <div className='flex pt-32 px-60 gap-7 items-center'>
          <div>LOGO</div>
          <div className='flex flex-col'>
            <h1 className='font-bold text-xl'>Dunkin Donuts Cabang Kemang</h1>
            <h1 className=''>Official Branch</h1>
          </div>
        </div>
        <div className='flex items-center h-16'>
          <hr className='w-3/4 border-t-2 border-gray-300 mx-auto' />
        </div>
        <div className='px-60'>
          <h1 className='font-bold text-xl'>🌱 Penawaran Menarik</h1>
          <h1 className=''>Check out segera, sebelum kehabisan!</h1>
        </div>
      </div>
      <div className='pb-10 px-60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          cardsData.map((card) => (
            <GeraiCard 
              key={card.id}
              image={card.image || "/images/products/delivery-box.png"}
              name={card.nama}
              deskripsi={card.deskripsi}
              rating={4.5}
              normalPrice={card.harga}
              discountPrice={card.harga * 0.9}
              stock={card.stok}
              productId={card.id}
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GeraiDetail;
