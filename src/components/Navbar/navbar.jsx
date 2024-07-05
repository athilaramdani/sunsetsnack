import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-green-300 p-4">
      <ul className="flex justify-around items-center">
        <li>
          <Link href="/" className="text-white font-bold" >LOGO
          </Link>
        </li>
        <li>
        <input
              type="text"
              placeholder="Cari apapun itu"
              // value={search}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-[1000px] px-3 py-2 border rounded"
            />
        <button type="button" className='px-3 py-2 border rounded bg-white'>Cari</button>

        </li>
        <li>
          <div>
            <Link href="../Login" className="text-white font-bold">Login</Link>
            <Link href="../Register" className="text-white font-bold"> Register</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
