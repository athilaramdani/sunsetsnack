"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/navbar';
import ItemCart from '@/components/itemcart';
import TotalCart from '@/components/totalcart';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const router = useRouter()
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState('Rp 0');
  const [user, setUser] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
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
          const cartItems = data.cartItems.map(item => ({
            ...item,
            checked: item.carted // Add checked state based on carted value
          }));
          setItems(cartItems);
          calculateTotal(cartItems);
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

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedItems = items.map(item => ({ ...item, checked: newSelectAll }));
    setItems(updatedItems);
  };

  const handleItemCheck = (cartItemId) => {
    const updatedItems = items.map(item =>
      item.cartItemId === cartItemId ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    setSelectAll(updatedItems.every(item => item.checked));
  };

  const handlePayment = async () => {
    try {
      const selectedItems = items.filter(item => item.checked);

      const response = await fetch('/api/cart/carted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.userId,
          selectedItems: selectedItems.map(item => ({
            productId: item.product.productId,
            carted: true,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send selected items');
      }

      // Handle success (e.g., navigate to payment page or show success message)
      console.log('Selected items sent successfully');
      router.push('/pembayaran')
    } catch (error) {
      console.error(error);
    }
  };

  let lastToko = null;

  return (
    <div>
      <Navbar carts={items} user={user} notifications={notifications}/>
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-16 lg:px-32 xl:px-40 pt-8">
        <div className="flex-grow">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex items-center border-b border-gray-200 pb-4 mb-4">
              <input type="checkbox" className="mr-4" checked={selectAll} onChange={handleSelectAll} />
              <span>Pilih Semua</span>
            </div>
            {items.map((item) => {
              const showTokoName = item.product.toko?.nama !== lastToko;
              lastToko = item.product.toko?.nama;

              return (
                <div key={item.cartItemId} className="mb-4">
                  {showTokoName && (
                    <div className="font-semibold mb-2">{item.product.toko?.nama}</div>
                  )}
                  <ItemCart item={item} handleItemCheck={handleItemCheck} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <TotalCart total={total} items={items} handlePayment={handlePayment} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
