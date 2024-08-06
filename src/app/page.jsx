"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import MPCard from '@/components/mpcard';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [cardsData, setCardsData] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const [carts, setCarts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerPage(5);
      } else if (width >= 768) {
        setCardsPerPage(3);
      } else {
        setCardsPerPage(1);
      }
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

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

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchCart = async () => {
        try {
          const response = await fetch('/api/cart/getcart', {
            headers: {
              'user-id': session.user.userId,
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
      const fetchNotifications = async () => {
        try {
          const response = await fetch('/api/notifications/getnotifications', {
            headers: {
              'user-id': session.user.userId,
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setNotifications(data.notifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
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
  
  return (
    <div>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Navbar carts={carts} user={user} notifications={notifications} />
      </div>
      <div className='pt-32 pb-24 max-w-screen-2xl mx-auto p-8'>
      <div>
          <h1 className="text-2xl font-bold mb-4">🌱 Yuk, Segera Selamatkan!</h1>
          <p className="text-lg mb-8">Mulai beri dampak nyata dari sekarang</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-8 gap-2">
          {cardsData.length === 0 ? (
            [...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse flex flex-col items-center p-4 border rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : (
            [...cardsData]
              .sort((a, b) => b.stok - a.stok) // Sort by stock in descending order
              .map((card) => (
                <MPCard
                  key={card.productId}
                  image={card.image || "/images/products/delivery-box.png"}
                  name={card.nama}
                  toko={card.toko}
                  reviews={card.reviews}
                  normalPrice={card.harga}
                  discountPrice={card.harga * 0.9}
                  stock={card.stok}
                  productId={card.productId}
                />
              ))
          )}
        </div>
      </div>
      <div className='bg-[#4C956C]'>
        <div className='p-12 bg-[#C8DED1] rounded-bl-[100px] rounded-tr-[100px]'>
          <div className='max-w-screen-2xl mx-auto'>
          <div>
              <h1 className="text-2xl font-bold mb-4">💵 Penawaran Menarik!</h1>
              <p className="text-lg mb-8">Menu oke, dengan penawaran menarik</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
              >
                &lt;
              </button>
              <div className="flex overflow-x-auto md:gap-8 gap-2 px-4">
                {displayedCards.length === 0 ? (
                  [...Array(cardsPerPage)].map((_, index) => (
                    <div
                      key={index}
                      className="animate-pulse flex flex-col items-center p-4 border rounded-lg shadow-md"
                      style={{ width: "200px", height: "300px" }}
                    >
                      <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                      <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                  ))
                ) : (
                  [...displayedCards]
                    .sort((a, b) => a.harga - b.harga) // Sort by price in ascending order
                    .map((card) => (
                      <MPCard
                        key={card.productId}
                        image={card.image || "/images/products/delivery-box.png"}
                        name={card.nama}
                        location={card.toko}
                        reviews={card.reviews}
                        normalPrice={card.harga}
                        discountPrice={card.harga * 0.9}
                        stock={card.stok}
                        productId={card.productId}
                      />
                    ))
                )}
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex >= cardsData.length - cardsPerPage}
                className="px-4 py-2 bg-primary text-white rounded disabled:bg-gray-400"
              >
                &gt;
              </button>
            </div>

          </div>
          <div className='flex justify-center items-center pt-8'>
            <button className='bg-[#A8C4B4] px-8 md:px-32 py-2 md:py-4 rounded-xl text-[#2C6E49] font-bold'>Lihat Semua</button>
          </div>
        </div>
      </div>
      <Footer className="inset-x-0 bottom-0"/>
    </div>
  );
};

export default Home;
