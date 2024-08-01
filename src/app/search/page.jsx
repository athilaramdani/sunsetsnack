"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/navbar';
import Footer from '@/components/Footer/footer';
import MPCard from '@/components/mpcard';
import CardToko from '@/components/cardToko';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const Home = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [queryData, setQueryData] = useState({ products: [], toko: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carts, setCarts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${q}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQueryData(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q]);

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

  const { products, toko } = queryData;

  return (
    <div>
      <div className='fixed top-0 left-0 w-full z-50'>
        <Navbar carts={carts} user={user} notifications={notifications} />
      </div>
      <div className='pt-32 max-w-screen-2xl mx-auto p-8'>
        <div>
          <h1 className="text-2xl font-bold mb-4">Makanan Surplus yang dicari</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-8 gap-2">
          {loading ? (
            [...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse flex flex-col items-center p-4 border rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <MPCard 
                key={product.productId}
                image={product.image || "/images/products/delivery-box.png"}
                name={product.nama}
                toko={product.toko}
                reviews={product.reviews}
                normalPrice={product.harga}
                discountPrice={product.harga * 0.9}
                stock={product.stok}
                productId={product.productId}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Tidak menemukan produk apapun.</p>
          )}
        </div>
      </div>
      <div className='max-w-screen-2xl mx-auto p-8'>
        <div>
          <h1 className="text-2xl font-bold mb-4">Toko yang dicari</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-8 gap-2">
          {loading ? (
            [...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse flex flex-col items-center p-4 border rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : toko.length > 0 ? (
            toko.map((tokoItem) => (
              <CardToko
                key={tokoItem.tokoId}
                toko={tokoItem}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Tidak menemukan toko apapun.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
