import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/opensealogo.png";
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import Searchbar from "./components/Searchbar";
import NavigationComponent from "./components/NavigationComponent";
import DialogMobile from "./mobile/DialogMobile";

const textStyle = `text-sm lg:text-2xl font-semibold text-slate-900 hover:text-gray-300 cursor-pointer`;

const navigations = ["collections", "stats"];

const Navbar = () => {
  const [media, setMedia] = React.useState(true);

  React.useEffect(() => {
    const match = window.matchMedia("(min-width: 768px)").matches;
    setMedia(match);
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((current) => !current);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Warning to connect Metamask and connect to Mumbai network
  const [close, setClose] = React.useState(false);
  const handleClickClose = () => {
    setClose(true);
    sessionStorage.setItem("close", "true");
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("close")) setClose(true);
  }, []);

  // Mobile version
  const [openSearchBarM, setOpenSearchBarM] = React.useState(false);
  const handleClickMobile = () => {
    setOpenSearchBarM(true);
  };
  const handleMobileClose = () => {
    setOpenSearchBarM(false);
  };
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleClickMenu = () => {
    setMenuOpen((current) => !current);
  };

  const Menu = () =>
    menuOpen ? (
      <AiOutlineClose className="text-2xl" onClick={handleClickMenu} />
    ) : (
      <AiOutlineMenu className="text-2xl" onClick={handleClickMenu} />
    );

  return (
    <div className="sticky top-0 z-10">
      <Searchbar mobile open={openSearchBarM} onClick={handleMobileClose} />
      <div className="relative flex w-full items-center gap-2 bg-white py-2 px-5 shadow-lg">
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-5">
            <Image src={logo} alt="logo" width={40} height={40} />
            <p className={textStyle}>OpenSea</p>
          </div>
        </Link>
        {media === false ? (
          <>
            <AiOutlineSearch
              className="ml-auto text-2xl"
              onClick={handleClickMobile}
            />
            <Menu />
            <DialogMobile
              open={menuOpen}
              onClick={handleClickMenu}
              onClose={handleClickMenu}
              navigations={navigations}
            />
          </>
        ) : (
          <>
            <Searchbar />
            <NavigationComponent
              open={open}
              onClick={handleClick}
              onClose={handleClose}
              navigations={navigations}
            />
          </>
        )}
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
