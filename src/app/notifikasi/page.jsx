"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar/navbar';
import NotificationList from '@/components/NotificationList';

const Cart = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

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
        } finally {
          setLoading(false);
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

  return (
    <div>
      <Navbar carts={items} user={user} notifications={notifications}/>
      <div className="container mx-auto p-4">
        <NotificationList notifications={notifications} loading={loading} />
      </div>
    </div>
  );
};

export default Cart;
