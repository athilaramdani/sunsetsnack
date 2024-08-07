"use client";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Notification from '@/components/notification';
import CartPopUp from '@/components/cartPopUp';
import ProfilePopUp from '@/components/popUpProfile';

library.add(faCartShopping, faBell, faBars);

const Navbar = ({ carts, user, notifications, onMenuItemClick }) => {
  const { data: session, status } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCartPopUp, setShowCartPopUp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const router = useRouter();
  const inputRef = useRef();

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    // Set the input value to searchQuery
    if (inputRef.current) {
      inputRef.current.value = searchQuery;
    }
  }, [searchQuery]);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim() !== '') {
        updateHistory(searchQuery);
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleSearchClick = (query) => {
    setSearchQuery(query);
    updateHistory(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const updateHistory = (query) => {
    const updatedHistory = [query, ...history.filter(item => item !== query)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const isLoggedIn = status === 'authenticated';
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="bg-white py-2 md:p-5 outline outline-1 outline-[#AEB2BE] shadow-sm">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex justify-around items-center px-1 md:px-10 gap-1 md:gap-8">
          <li className="flex items-center px-3">
            <Link href="/" className="text-black">
              <svg
                width="65"
                height="38"
                viewBox="0 0 65 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform transform hover:scale-110 w-12 md:w-32 md:h-19"
              >
                <path
                  d="M23.5 0.690466C11.1 3.89047 0 17.4905 0 29.4905C0 35.3905 1.7 37.7905 5.9 37.7905C8.9 37.7905 11 36.1905 11 33.7905C11 32.8905 11.7 29.8905 12.5 26.9905C15.5 16.9905 22.5 11.7905 33 11.7905C44.5 11.7905 50.5 17.6905 53.5 31.9905C54.2 35.6905 56.6 37.7905 59.9 37.7905C64 37.7905 65.1 35.7905 64.9 29.2905C64.4 18.4905 57.3 8.09047 46.5 2.49047C42.1 0.290466 29 -0.809534 23.5 0.690466Z"
                  fill="#406B40"
                />
              </svg>
            </Link>
          </li>
          <li className="flex items-center w-full md:w-2/3 border-2 border-gray-300 rounded-xl relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Cari apapun itu"
              className="w-full px-3 py-3 border rounded-lg text-sm bg-placeholder"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => setShowHistory(true)}
              onBlur={() => setTimeout(() => setShowHistory(false), 100)}
            />
            {history.length > 0 && showHistory && (
              <ul className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {history.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="flex items-center relative">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowNotifications, hideNotificationTimeout)}
              onMouseLeave={() => handleMouseLeave(setShowNotifications, hideNotificationTimeout)}
            >
              <Link href="/notifikasi" className="text-black ">
                <FontAwesomeIcon icon="fa-regular fa-bell" className="hover:text-primary mx-3 cursor-pointer hover:scale-125 transition-transform transform" />
              </Link>
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
          </li>
          <li>
          <div
              className="relative"
              onMouseEnter={() => handleMouseEnter(setShowCartPopUp, hideCartPopUpTimeout)}
              onMouseLeave={() => handleMouseLeave(setShowCartPopUp, hideCartPopUpTimeout)}
            >
              <Link href="/keranjang" className="text-black ">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="hover:text-primary mx-3 cursor-pointer hover:scale-125 transition-transform transform" />
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
            {status === 'loading' ? (
              <div className="animate-pulse flex items-center space-x-2 gap-8">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-24 h-6 bg-gray-200 rounded"></div>
              </div>
            ) : isLoggedIn ? (
              <div className="flex items-center justify-center space-x-2 gap-8">
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(setShowProfile, hideProfileTimeout)}
                  onMouseLeave={() => handleMouseLeave(setShowProfile, hideProfileTimeout)}
                >
                  <Link href="/profile" className="text-black mx-4 flex gap-4 items-center hover:text-primary">
                    <Image width={30} height={30} src={user?.image || '/images/userdefault.jpg'} alt="Avatar" className="rounded-full mx-1" />
                    {user?.username}
                  </Link>
                  {showProfile && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 z-10"
                      onMouseEnter={() => handleMouseEnter(setShowProfile, hideProfileTimeout)}
                      onMouseLeave={() => handleMouseLeave(setShowProfile, hideProfileTimeout)}
                    >
                      <ProfilePopUp user={user} onMenuItemClick={onMenuItemClick}/>
                    </div>
                  )}
                </div>
                <button onClick={handleLogout} className="text-black mx-6 hover:text-primary">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-black hover:text-primary">Login</Link>
                <span>|</span>
                <Link href="/register" className="text-black hover:text-primary">Register</Link>
              </div>
            )}
          </li>
        </ul>
        {showMobileMenu && (
          <ul className="block md:hidden mt-4">
            {status === 'loading' ? (
              <li className="animate-pulse flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-24 h-6 bg-gray-200 rounded"></div>
              </li>
            ) : isLoggedIn ? (
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
