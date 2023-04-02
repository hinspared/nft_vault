import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/logo.webp";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Searchbar from "./components/Searchbar";
import NavigationComponent from "./components/NavigationComponent";
import DialogMobile from "./mobile/DialogMobile";
import WarningComponent from "./components/WarningComponent";
import MobileSearchbar from "./mobile/MobileSearchbar";
import { useQuery } from "react-query";
import fetchCollections from "../../utils/helpers/fetchCollections";

const textStyle = `text-sm lg:text-2xl font-semibold text-slate-900 hover:text-gray-300 cursor-pointer`;
const navigationLinks = ["collections", "stats"];

const Navbar: React.FC = () => {
  const [isMobile, setMobile] = React.useState(false);
  const { data: collections } = useQuery("collections", fetchCollections, {
    initialData: [],
  });

  React.useEffect(() => {
    const handleScreenSize = () => {
      setMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener("resize", handleScreenSize);

    handleScreenSize();
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  // open/close the wallet component of desktop searchbar
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((current) => !current);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // mobile menu
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleClickMenu = () => {
    setMenuOpen((current) => !current);
  };

  const MobileMenuIcon = () =>
    menuOpen ? (
      <AiOutlineClose className="text-2xl" onClick={handleClickMenu} />
    ) : (
      <AiOutlineMenu className="text-2xl" onClick={handleClickMenu} />
    );

  // warning to connect Metamask wallet and connect to Mumbai network
  const [isWarningClosed, setWarningClosed] = React.useState(false);
  const handleClickClose = () => {
    setWarningClosed(true);
    sessionStorage.setItem("close", "true");
  };
  React.useEffect(() => {
    if (sessionStorage.getItem("close")) setWarningClosed(true);
  }, []);

  return (
    <div className="sticky top-0 z-10">
      <div className="relative flex w-full items-center gap-2 bg-white py-2 px-5 shadow-lg">
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-5">
            <Image src={logo} alt="logo" width={40} height={40} />
            <p className={textStyle}>NFT vault</p>
          </div>
        </Link>
        {isMobile ? (
          <>
            <MobileSearchbar collections={collections} />
            <MobileMenuIcon />
            <DialogMobile
              open={menuOpen}
              onClose={handleClickMenu}
              navigations={navigationLinks}
            />
          </>
        ) : (
          <>
            <Searchbar collections={collections} />
            <NavigationComponent
              open={open}
              onClick={handleClick}
              onClose={handleClose}
              navigations={navigationLinks}
            />
          </>
        )}
      </div>
      <WarningComponent
        isWarningClosed={isWarningClosed}
        onClick={handleClickClose}
      />
    </div>
  );
};

export default Navbar;
