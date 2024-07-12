"use client";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from 'react';
import Image from 'next/image';

library.add(faCartShopping);
library.add(farBell);

const Navbar = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState({
    username: '',
  });
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
        <li className='flex items-center w-2/3'>
          <input
            type="text"
            placeholder="Cari apapun itu"
            className="w-full px-3 py-3 border rounded-lg text-sm bg-placeholder"
          />
        </li>
        <li>
          <div className="flex items-center space-x-2">
            <Link href="/keranjang" className='mx-4'>
              <FontAwesomeIcon icon="fa-regular fa-bell" />
            </Link>
            <Link href="/keranjang" className="text-black ">
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </Link>
          </div>
        </li>
        <li>
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <a href='/profile'>
              <Image width={30} height={30} src={userData.image || '/images/userdefault.jpg'} alt="Avatar" className=" rounded-full mx-1"/>
              </a>
              <Link href="/profile" className="text-black mx-4 ">{userData.username}</Link>
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
