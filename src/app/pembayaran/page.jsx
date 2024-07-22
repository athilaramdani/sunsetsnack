"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/navbar';
import ItemCart from '@/components/itemcart';
import PembayaranCart from '@/components/pembayarancart';
import PembayaranCard from '@/components/pembayarancard';
import PaymentMethod from '@/components/paymentmethod';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [total, setTotal] = useState('Rp 0');
  const [showPembayaran, setShowPembayaran] = useState(false);
  const { data: session, status } = useSession();
  const [carts, setCarts] = useState([]);

  const togglePembayaran = () => {
    setShowPembayaran(!showPembayaran);
  };

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

  return (
    <div>
      <Navbar carts= {carts}/>
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 lg:px-16 xl:px-20 pt-24">
        <div className="flex-grow">
          <div className="bg-white p-4">
            <h1 className="font-bold text-2xl pb-12">Konfirmasi Pesanan</h1>
            <div className="pb-8 gap-2 flex flex-col">
              <h1 className="font-bold text-xl">Alamat Gerai</h1>
              <p className="break-words text-clip w-full md:w-3/4">
                Jl. RS. Fatmawati Raya Cilandak No.74, RT.1/RW.3, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430
              </p>
            </div>
            <div>
              <h1 className="font-bold text-xl">Tipe Pemesanan</h1>
              <div className='flex space-x-4 items-center pt-4 pl-2'>
                <FontAwesomeIcon icon={faLocationDot} size="xl" style={{color:"#1C274C"}}/>
                <p>Ambil di gerai</p>
              </div>
            </div>
            <div className='pt-8'>
              <h1 className='pb-2'>Dunkin Donuts Cabang Kemang</h1>
              <PembayaranCard/>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <PembayaranCart total={total} togglePembayaran={togglePembayaran} />
        </div>
      </div>
      {showPembayaran && (
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-30 w-96 p-4 bg-white rounded-lg shadow-lg">
            <PaymentMethod />
            <button onClick={togglePembayaran} className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
