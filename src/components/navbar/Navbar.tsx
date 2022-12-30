import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/opensealogo.png";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoMdWallet } from "react-icons/io";
import { ConnectWallet } from "@thirdweb-dev/react";
import useOutsideClick from "../../utils/hooks/clickoutsideComponent";
import { Searchbar } from "./Searchbar";

const navigations = ["Collections", "Stats"];
const textStyle = `text-2xl font-semibold text-slate-900 hover:text-gray-300 cursor-pointer`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [close, setClose] = React.useState(false);
  const ref = useOutsideClick(handleClose);
  const handleClickClose = () => {
    setClose(true);
    sessionStorage.setItem("close", "true");
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("close")) setClose(true);
  }, []);

  return (
    <div className="sticky top-0 z-10">
      <div className="flex w-full bg-white py-2 px-10 shadow-lg">
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-5">
            <Image src={logo} alt="logo" width={40} height={40} />
            <p className={textStyle}>OpenSea</p>
          </div>
        </Link>
        <Searchbar />
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
      <div
        className={`${
          close ? "hidden" : null
        } flex w-full items-center justify-center bg-amber-400 p-1`}
      >
        <p className="font-slate-700 ml-auto text-sm">
          Please connect your wallet and use{" "}
          <a
            href="https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f#:~:text=Connect%20Metamask%20to%20Polygon%20Testnet,the%20Mumbai%20Testnet%20in%20Metamask."
            className="underline decoration-solid hover:text-sky-900"
            target="_blank"
            rel="noreferrer"
          >
            the test network (Mumbai)
          </a>
        </p>
        <AiOutlineClose className="ml-auto" onClick={handleClickClose} />
      </div>
    </div>
  );
};

export default Navbar;
