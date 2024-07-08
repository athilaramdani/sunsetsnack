import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md">
      <ul className="flex justify-around items-center px-10">
        <li>
          <Link href="/" className="text-black font-bold" >LOGO
          </Link>
        </li>
        <li className='flex items-center w-2/3'>
        <input
              type="text"
              placeholder="Cari apapun itu"
              // value={search}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-1 text-sm bg-placeholder"
            />
        <button type="button" className='text-sm px-3 py-2 border rounded bg-white'>Cari</button>

        </li>
        <li>
          <div>
            <Link href="/login" className="text-black font-bold">Login</Link>
            <Link href="/register" className="text-black font-bold"> Register</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
