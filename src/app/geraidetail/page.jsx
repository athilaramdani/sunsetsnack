"use client"
import GeraiCard from '@/components/geraicard';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const GeraiDetail = () => {
  const { data: session, status } = useSession();
  const [cardsData, setCardsData] = useState([]);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState(null);  // Perbaikan: Mendefinisikan dengan benar
  const [notifications, setNotifications] = useState([]);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('productId');
    setProductId(id);
  }, []);
  
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
          setNotifications(data.notifications); // Change this line
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [session, status]);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar user={user} carts={carts} notifications={notifications}/>
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
              key={card.productId}  // Menggunakan card.productId sebagai key
              image={card.image || "/images/products/delivery-box.png"}
              name={card.nama}
              deskripsi={card.deskripsi}
              reviews={card.reviews}
              normalPrice={card.harga}
              discountPrice={card.harga * 0.9}
              stock={card.stok}
              productId={card.productId}  // Menggunakan card.productId untuk productId
            />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GeraiDetail;
