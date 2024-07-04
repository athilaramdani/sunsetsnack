import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-300 p-4">
      <ul className="flex justify-around">
        <li>
          <Link href="/">
          </Link>
        </li>
        <li>
          <Link href="/login">
          </Link>
        </li>
        <li>
          <Link href="../register" className=""> go to regist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
