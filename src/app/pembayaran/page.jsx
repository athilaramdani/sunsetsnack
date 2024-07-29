"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/navbar';
import PembayaranCart from '@/components/pembayarancart';
import PembayaranCard from '@/components/pembayarancard';
import PaymentMethod from '@/components/paymentmethod';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter()
  const { data: session, status } = useSession();
  const [total, setTotal] = useState('Rp 0');
  const [showPembayaran, setShowPembayaran] = useState(false);
  const [carts, setCarts] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
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

  const calculateTotal = (carts) => {
    const total = carts.reduce((sum, cart) => sum + cart.product.harga * cart.quantity, 0);
    setTotal(`Rp ${total}`);
  };

  const togglePembayaran = () => {
    setShowPembayaran(!showPembayaran);
  };

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
          const filteredCarts = data.cartItems.filter(cart => cart.carted); // Filter carted true
          setCarts(filteredCarts);
          calculateTotal(filteredCarts || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
      fetchCart();
    }
  }, [session, status]);

  const handlePayment = async () => {
    console.log('Cart Items:', carts); // Log data yang dikirim
    try {
      const response = await fetch(`/api/pembayaran/pembayaranpostall`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': session.user.userId
        },
        body: JSON.stringify({
          cartItems: carts,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response data:', errorData); // Log detail error dari respons
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Order placed successfully:', data);
      router.push('/profile')
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  let lastToko = null;
  console.log(carts)
  return (
    <div>
      <Navbar carts={carts} user={user} notifications={notifications}/>
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 pt-8">
        <div className="flex-grow">
          <div className="bg-white p-4">
            <h1 className="font-bold text-2xl pb-12">Konfirmasi Pesanan</h1>
            <div className="pb-8 gap-2 flex flex-col">
              {carts.map((cart, index) => {
                const showTokoName = cart.product.toko?.nama !== lastToko;
                if (showTokoName) {
                  lastToko = cart.product.toko?.nama;
                }
                return (
                  <div key={cart.cartItemId} className="mb-4">
                    {index === 0 && (
                      <div>
                        <h1 className="font-bold text-xl">Alamat Gerai</h1>
                      </div>
                    )}
                    {showTokoName && (
                      <div>
                        <div className="font-semibold">{cart.product.toko.nama}</div>
                        <p className="break-words text-clip w-full md:w-3/4">
                          {cart.product.toko.alamat}
                        </p>
                      </div>
                    )}
                    <PembayaranCard cart={cart} />
                  </div>
                );
              })}
            </div>
            <div>
              <h1 className="font-bold text-xl">Tipe Pemesanan</h1>
              <div className='flex space-x-4 items-center pt-4 pl-2'>
                <FontAwesomeIcon icon={faLocationDot} size="xl" style={{ color: "#1C274C" }} />
                <p>Ambil di gerai</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <PembayaranCart total={total} togglePembayaran={togglePembayaran} />
        </div>
      </div>
      {showPembayaran && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-30 w-11/12 h-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-lg p-4 md:p-8">
            <PaymentMethod total={total} onPay={handlePayment} />
            <div className='flex justify-center'>
              <button onClick={togglePembayaran} className="mt-4 w-1/2 bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
