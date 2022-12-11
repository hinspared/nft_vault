import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/opensealogo.png";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoMdWallet } from "react-icons/io";
import { ConnectWallet } from "@thirdweb-dev/react";
import useOutsideClick from "../utils/hooks/clickoutsideComponent";

const navigations = ["Collections", "Stats"];
const textStyle = `text-2xl font-semibold text-slate-900 hover:text-gray-300 cursor-pointer`;
// const styles = {
// container: `flex py-2 px-10 w-full sticky`,
// text: `text-2xl font-semibold text-black hover:text-gray-300 cursor-pointer`,
// logoContainer: `flex items-center cursor-pointer gap-5`,
// searchBarContainer: `flex flex-1 mx-10  items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
// searchIcon: `text-gray-500 mx-3 font-bold text-lg`,
// searchInput: `h-3 w-full border-0 bg-transparent outline-0  px-2 pl-0 text-gray-300 placeholder:text-[#8a939b]`,
// navigationsContainer: `flex items-center gap-4`,
// };

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ref = useOutsideClick(handleClose);
  return (
    <div className="sticky flex w-full py-2 px-10">
      <Link href="/">
        <div className="flex cursor-pointer items-center gap-5">
          <Image src={logo} alt="logo" width={40} height={40} />
          <p className={textStyle}>OpenSea</p>
        </div>
      </Link>
      <div className="mx-10 flex flex-1  items-center rounded-[0.8rem] bg-[#363840] hover:bg-[#4c505c]">
        <AiOutlineSearch className="mx-3 text-lg font-bold text-gray-500" />
        <input
          className="h-3 w-full border-0 bg-transparent px-2  pl-0 text-gray-300 outline-0 placeholder:text-[#8a939b]"
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className="flex items-center gap-4">
        {React.Children.toArray(
          navigations.map((navigation) => (
            <Link href={`/${navigation.toLowerCase()}`}>
              <p className={textStyle}>{navigation}</p>
            </Link>
          ))
        )}
        <BiUserCircle className={textStyle} />
        <div className="relative" ref={ref}>
          <IoMdWallet className={textStyle} onClick={handleClick} />
          <div
            className={`absolute left-[-7rem] top-[2.7rem] ${
              open ? "" : "hidden"
            }`}
          >
            <ConnectWallet />
          </div>
        </div>
        <AiOutlineShoppingCart className={textStyle} />
      </div>
    </div>
  );
};

export default Navbar;
