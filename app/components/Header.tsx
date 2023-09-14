import Link from "next/link";
import UserGreeting from "./UserGreeting";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-neutral-950 flex justify-center border-b border-sky-500/30 shadow-[0_5px_25px_3px] shadow-sky-500/10">
      <div className="container grid grid-cols-3 pt-4 pb-2">
        <Link href={"/"} className="logo">
          Logo
        </Link>
        <div className="justify-self-center self-center">
          <UserGreeting />
        </div>
        <menu className="flex gap-2 justify-end">
          <li>
            <a href="/profile" className="navLink">
              Profile
            </a>
          </li>
          <li>
            <a href="/admin" className="navLink">
              Admin
            </a>
          </li>
          <li>
            <a href="/secrets" className="navLink">
              Secrets
            </a>
          </li>
        </menu>
      </div>
    </header>
  );
};

export default Header;
