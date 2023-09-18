import Link from "next/link";
import UserGreeting from "./UserGreeting";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-neutral-950 flex justify-center border-b border-sky-500/30 shadow-[0_5px_25px_3px] shadow-sky-500/10">
      <div className="container grid grid-cols-3 pt-4 pb-2">
        <div className="flex justify-start items-center">
          <Link href={"/"} className="logo">
            Logo
          </Link>
        </div>
        <div className="justify-self-center self-center">
          <UserGreeting />
        </div>
        <div>
          <NavLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
