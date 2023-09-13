import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center">
      <div className="container flex justify-between items-center pt-4">
        <Link href={"/"} className="logo">
          Logo
        </Link>
        <menu className="flex gap-2">
          <li>
            <a href="/" className="navLink">
              Link
            </a>
          </li>
          <li>
            <a href="/" className="navLink">
              Link
            </a>
          </li>
          <li>
            <a href="/" className="navLink">
              Link
            </a>
          </li>
        </menu>
      </div>
    </header>
  );
};

export default Header;
