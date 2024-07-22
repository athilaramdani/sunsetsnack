"use client";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Notification from '@/components/notification';
import CartPopUp from '@/components/cartpopup';
import ProfilePopUp from '@/components/popupprofile';

library.add(faCartShopping);
library.add(farBell);

const Navbar = ({ carts }) => {
  console.log(carts);
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({
    username: '',
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCartPopUp, setShowCartPopUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/user/userinfo`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.log("cannot show username");
        }
      };

      fetchData();
    }
  }, [session, status]);

  useEffect(() => {
    console.log("Carts prop in Navbar updated:", carts);
  }, [carts]);

  const isLoggedIn = status === 'authenticated';
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white p-5 outline outline-1 outline-[#AEB2BE] shadow-sm">
      <div className='max-w-screen-xl mx-auto'>
        <ul className="flex justify-around items-center px-10">
          <li>
            <Link href="/" className="text-black">Logo</Link>
          </li>
          <li className='flex items-center w-2/3 border-2 border-gray-300 rounded-xl'>
            <input
              type="text"
              placeholder="Cari apapun itu"
              className="w-full px-3 py-3 border rounded-lg text-sm bg-placeholder"
            />
          </li>
          <li>
            <div className="flex items-center space-x-2 relative">
              <div
                className="relative"
                onMouseEnter={() => setShowNotifications(true)}
                onMouseLeave={() => setShowNotifications(false)}
              >
                <FontAwesomeIcon icon="fa-regular fa-bell" className="mx-4 cursor-pointer" />
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 z-10">
                    <Notification />
                  </div>
                )}
              </div>
              <div
                className="relative"
                onMouseEnter={() => setShowCartPopUp(true)}
                onMouseLeave={() => setShowCartPopUp(false)}
              >
                <Link href="/keranjang" className='text-black'>
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="mx-4 cursor-pointer" />
                </Link>
                {showCartPopUp && (
                  <div className="absolute right-0 mt-2 w-96 z-10">
                    <CartPopUp carts={carts} />
                  </div>
                )}
              </div>
            </div>
          </li>
          <li>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div
                  className="relative"
                  onMouseEnter={() => setShowProfile(true)}
                  onMouseLeave={() => setShowProfile(false)}
                >
                  <Link href="/profile" className='text-black mx-4 flex gap-4 items-center'>
                    <Image width={30} height={30} src={userData.image || '/images/userdefault.jpg'} alt="Avatar" className="rounded-full mx-1" />
                    {userData.username}
                  </Link>
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-96 z-10">
                      <ProfilePopUp />
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="text-black mx-6">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-black">Login</Link>
                <span>|</span>
                <Link href="/register" className="text-black">Register</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
