import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-green-300 p-4">
      <ul className="flex justify-around">
        <li>
          <Link href="/">
          </Link>
        </li>
        <li>
          <Link href="../login" className="text-white font-bold"> Login</Link>
        </li>
        <li>
          <Link href="../register" className="text-white font-bold"> Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
