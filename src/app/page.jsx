"use client"
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/navbar';
// import Content from '@/components/Content/content';
import Footer from '@/components/Footer/footer';
import MPCard from '@/components/mpcard';

const Home = () => {
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
      <div className='p-8'>
        <div>
          <h1 className="text-2xl font-bold mb-4">🌱 Yuk, Segera Selamatkan!</h1>
          <p className="text-lg mb-8">Mulai beri dampak nyata dari sekarang</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardsData.map((card) => (
            <MPCard 
              key={card.id}
              image={card.image || "https://instagram.fbdo4-1.fna.fbcdn.net/v/t39.30808-6/440456408_18223882720287518_6376668148965592585_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyLmYzMDgwOCJ9&_nc_ht=instagram.fbdo4-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=0FPCruup94YQ7kNvgGorRsy&edm=AEhyXUkAAAAA&ccb=7-5&ig_cache_key=MzM2Mzg1NjQ4MDQzNTE4OTMyMQ%3D%3D.2-ccb7-5&oh=00_AYC7Fb2vSLKFFZPb1cxZtcy6MP_N9vsyosIyK5mMw9z6EQ&oe=6692ACD8&_nc_sid=8f1549"}
              name={card.nama}
              location={card.deskripsi}
              rating={4.5}
              normalPrice={card.harga}
              discountPrice={card.harga * 0.9}
              stock={card.stok}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
