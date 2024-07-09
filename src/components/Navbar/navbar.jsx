"use client";
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const username = session?.user?.username || 'memek';
  const handleLogout = async () => {
    await signOut();
  };
  console.log(session?.user?.username)
  return (
    <nav className="bg-white p-4 shadow-md">
      <ul className="flex justify-around items-center px-10">
        <li>
          <Link href="/" className="text-black font-bold">LOGO</Link>
        </li>
        <li className='flex items-center w-2/3'>
          <input
            type="text"
            placeholder="Cari apapun itu"
            className="w-full px-3 py-2 border rounded-1 text-sm bg-placeholder"
          />
          <button type="button" className='text-sm px-3 py-2 border rounded bg-white'>Cari</button>
        </li>
        <li>
          <div className="flex items-center space-x-2">
            <Link href="/keranjang" className="text-black font-bold">Cart</Link>
            <span>|</span>
            <Link href="/profile" className="text-black font-bold">Test Profile</Link>
          </div>
        </li>
        <li>
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <Link href="/profile" className="text-black font-bold">{username}</Link>
              <button onClick={handleLogout} className="text-black font-bold">Logout</button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login" className="text-black font-bold">Login</Link>
              <span>|</span>
              <Link href="/register" className="text-black font-bold">Register</Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
