"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/navbar';
import ItemCart from '@/components/itemcart';
import TotalCart from '@/components/totalcart';

const Cart = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState('Rp 0');
 

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
          setItems(data.cartItems || []);
          calculateTotal(data.cartItems || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };

      fetchCart();
    }
  }, [session, status]);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.product.harga * item.quantity, 0);
    setTotal(`Rp ${total}`);
  };

  return (
    <div>
      <Navbar carts= {items}/>
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-16 lg:px-32 xl:px-40 pt-24">
        <div className="flex-grow">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
              <input type="checkbox" className="mr-4" />
              <span>Pilih Semua</span>
            </div>
            {items.map((item) => (
              <div key={item.cartItemId} className="mb-4"> 
                <div className="font-semibold mb-2">{item.product.toko?.nama}</div>
                <ItemCart item={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <TotalCart total={total} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
