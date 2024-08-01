"use client"
import GeraiCard from '@/components/geraicard';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const GeraiDetail = () => {
  const { data: session, status } = useSession();
  const [cardsData, setCardsData] = useState([]);
  const [error, setError] = useState(null);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [tokoId, setTokoId] = useState(null);
  const [toko, setToko] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('tokoId');
    setTokoId(id);
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
          setNotifications(data.notifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }
  }, [session, status]);


  // 
  useEffect(() => {
    if (tokoId) {
      const fetchToko = async () => {
        try {
          
          const response = await fetch(`/api/toko/gettokoastokoid?tokoId=${tokoId}`);
          if (!response.ok) {
            throw new Error('Toko not found');
          }
          const data = await response.json();
          setToko(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchToko();
    }
  }, [tokoId]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <Navbar user={user} carts={carts} notifications={notifications} />
      <div className="h-full">
        <div className='pt-12'>
          <div className='flex pl-16 md:pl-60 gap-7 items-center'>
            <Image
              width={100}
              height={100}
              src={toko?.image || "/images/default-toko.png"}
            />
            <div className='flex flex-col'>
              <h1 className='font-bold text-xl'>{toko?.nama}</h1>
              <p className="">{toko?.alamat}</p>
              <p className="">{toko?.kota}</p>
              <p className="">{toko?.provinsi}</p>
            </div>
          </div>
          <div className='flex items-center h-16'>
            <hr className='w-3/4 border-t-2 border-gray-300 mx-auto' />
          </div>
          <div className='pl-16 md:pl-60'>
            <h1 className='font-bold text-xl'>🌱 Penawaran Menarik</h1>
            <h1 className=''>Check out segera, sebelum kehabisan!</h1>
          </div>
        </div>
        <div className='py-10 pl-16 md:pl-60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {cardsData.length > 0 ? (
            toko ? (
              cardsData.filter(card => card.tokoId === toko.tokoId).map((card) => (
                <GeraiCard
                  key={card.productId}
                  image={card.image || "/images/products/delivery-box.png"}
                  name={card.nama}
                  deskripsi={card.deskripsi}
                  reviews={card.reviews}
                  normalPrice={card.harga}
                  discountPrice={card.harga * 0.9}
                  stock={card.stok}
                  productId={card.productId}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">Memuat toko...</p>
            )
          ) : (
            <p className="col-span-full text-center text-gray-500">Tidak menemukan produk apapun.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GeraiDetail;
