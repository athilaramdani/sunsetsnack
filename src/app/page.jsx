"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import MPCard from '@/components/mpcard';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);  // Perbaikan: Mendefinisikan dengan benar
  const [cardsData, setCardsData] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 5;
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const products = await response.json();

        const detailedProducts = await Promise.all(products.map(async (product) => {
          const tokoResponse = await fetch(`/api/toko/gettokoasproduct?productId=${product.productId}`);
          const tokoData = await tokoResponse.json();
          return { ...product, toko: tokoData.nama };
        }));
        setCardsData(detailedProducts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchCart = async () => {
        try {
          const response = await fetch('/api/cart/getcart', {
            headers: {
              'user-id': session.user.userId, // Menggunakan userId dari sesi
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCarts(data.cartItems);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };

      fetchCart();
    }
  }, [session, status]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/user/userinfo`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("data user sebelum di fetch", data)
          setUser(data);
        } catch (error) {
          console.log("cannot show username");
        }
      };

      fetchUser();
    }
  }, [session, status]);

  const handleNext = () => {
    if (currentIndex < cardsData.length - cardsPerPage) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  const displayedCards = cardsData.slice(currentIndex, currentIndex + cardsPerPage);
  console.log("usernya: ", user);
  console.log("cartnya: ", carts);

  return (
    <div>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Navbar carts={carts} user={user}/>
      </div>
      <div className='pt-32 pb-24 max-w-screen-2xl mx-auto p-8'>
        <div>
          <h1 className="text-2xl font-bold mb-4">🌱 Yuk, Segera Selamatkan!</h1>
          <p className="text-lg mb-8">Mulai beri dampak nyata dari sekarang</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {cardsData.map((card) => (
            <MPCard 
              key={card.productId}
              image={card.image || "/images/products/delivery-box.png"}
              name={card.nama}
              toko={card.toko}  // Menggunakan nama toko
              rating={4.5}
              normalPrice={card.harga}
              discountPrice={card.harga * 0.9}
              stock={card.stok}
              productId={card.productId}  // Pass productId
            />
          ))}
        </div>
      </div>
      <div className='bg-[#4C956C]'>
        <div className='p-12 bg-[#C8DED1] rounded-bl-[100px] rounded-tr-[100px]'>
          <div className='max-w-screen-2xl mx-auto'>
            <div>
              <h1 className="text-2xl font-bold mb-4">🌱 Penawaran Menarik!</h1>
              <p className="text-lg mb-8">Menu oke, dengan penawaran menarik</p>
            </div>
            <div className="flex justify-between items-center ">
              <button onClick={handlePrevious} disabled={currentIndex === 0} className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400">
                &lt;
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-4 flex-grow">
                {displayedCards.map((card) => (
                  <MPCard 
                    key={card.productId}
                    image={card.image || "/images/products/delivery-box.png"}
                    name={card.nama}
                    location={card.toko}  // Menggunakan nama toko
                    rating={4.5}
                    normalPrice={card.harga}
                    discountPrice={card.harga * 0.9}
                    stock={card.stok}
                    productId={card.productId}  // Pass productId
                  />
                ))}
              </div>
              <button onClick={handleNext} disabled={currentIndex >= cardsData.length - cardsPerPage} className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400">
                &gt;
              </button>
            </div>
          </div>
          <div className='flex justify-center pt-8'>
            <button className='bg-[#A8C4B4] px-32 py-4 rounded-xl text-[#2C6E49] font-bold'>Lihat Semua</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
