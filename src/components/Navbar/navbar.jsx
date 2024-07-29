"use client";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { faCartShopping, faBars  } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Notification from '@/components/notification';
import CartPopUp from '@/components/cartpopup';
import ProfilePopUp from '@/components/popupprofile';

library.add(faCartShopping);
library.add(faBell);
library.add(faBars);

const Navbar = ({ carts, user, notifications }) => {
  const { data: session, status } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCartPopUp, setShowCartPopUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const hideNotificationTimeout = useRef();
  const hideCartPopUpTimeout = useRef();
  const hideProfileTimeout = useRef();

  const handleMouseEnter = (setShowFunction, timeoutRef) => {
    clearTimeout(timeoutRef.current);
    setShowFunction(true);
  };

  const handleMouseLeave = (setShowFunction, timeoutRef) => {
    timeoutRef.current = setTimeout(() => {
      setShowFunction(false);
    }, 200);
  };

  const isLoggedIn = status === 'authenticated';
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white p-3 md:p-5 outline outline-1 outline-[#AEB2BE] shadow-sm">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex justify-around items-center px-2 md:px-10 gap-2 md:gap-8">
          <li className="hidden md:block">
            <Link href="/" className="text-black">Logo</Link>
          </li>
          <li className="flex items-center w-full md:w-2/3 border-2 border-gray-300 rounded-xl">
            <input
              type="text"
              placeholder="Cari apapun itu"
              className="w-full px-3 py-3 border rounded-lg text-sm bg-placeholder"
            />
          </li>
          <li className="flex items-center relative">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowNotifications, hideNotificationTimeout)}
              onMouseLeave={() => handleMouseLeave(setShowNotifications, hideNotificationTimeout)}
            >
              <FontAwesomeIcon icon="fa-regular fa-bell" className="mx-4 cursor-pointer" />
              {showNotifications && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 md:w-96 w-60 z-10"
                  onMouseEnter={() => handleMouseEnter(setShowNotifications, hideNotificationTimeout)}
                  onMouseLeave={() => handleMouseLeave(setShowNotifications, hideNotificationTimeout)}
                >
                  <Notification notifications={notifications} />
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowCartPopUp, hideCartPopUpTimeout)}
              onMouseLeave={() => handleMouseLeave(setShowCartPopUp, hideCartPopUpTimeout)}
            >
              <Link href="/keranjang" className="text-black">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="mx-4 cursor-pointer" />
              </Link>
              {showCartPopUp && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 md:w-96 w-60 z-10"
                  onMouseEnter={() => handleMouseEnter(setShowCartPopUp, hideCartPopUpTimeout)}
                  onMouseLeave={() => handleMouseLeave(setShowCartPopUp, hideCartPopUpTimeout)}
                >
                  <CartPopUp carts={carts} />
                </div>
              )}
            </div>
          </li>
          <li className="block md:hidden">
            <button
              className="text-black"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <FontAwesomeIcon icon="fa-solid fa-bars" className='mx-2'/>
            </button>
          </li>
          <li className="hidden md:block">
            {isLoggedIn ? (
              <div className="flex items-center justify-center space-x-2 gap-8">
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setShowProfile, hideProfileTimeout)}
                  onMouseLeave={() => handleMouseLeave(setShowProfile, hideProfileTimeout)}
                >
                  <Link href="/profile" className="text-black mx-4 flex gap-4 items-center">
                    <Image width={30} height={30} src={user?.image || '/images/userdefault.jpg'} alt="Avatar" className="rounded-full mx-1" />
                    {user?.username}
                  </Link>
                  {showProfile && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 z-10"
                      onMouseEnter={() => handleMouseEnter(setShowProfile, hideProfileTimeout)}
                      onMouseLeave={() => handleMouseLeave(setShowProfile, hideProfileTimeout)}
                    >
                      <ProfilePopUp user={user} />
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
        {showMobileMenu && (
          <ul className="block md:hidden mt-4">
            {isLoggedIn ? (
              <li>
                <div className="flex items-center space-x-2 gap-4">
                  <div className="relative">
                    <Link href="/profile" className="text-black mx-4 flex gap-4 items-center">
                      <Image width={30} height={30} src={user?.image || '/images/userdefault.jpg'} alt="Avatar" className="rounded-full mx-1" />
                      {user?.username}
                    </Link>
                  </div>
                  <button onClick={handleLogout} className="text-black mx-6">Logout</button>
                </div>
              </li>
            ) : (
              <li>
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="text-black">Login</Link>
                  <span>|</span>
                  <Link href="/register" className="text-black">Register</Link>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
