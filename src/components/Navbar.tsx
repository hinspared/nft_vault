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

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [resultOpen, setResultOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");
  const handleClick = () => {
    setOpen(true);
  };
  const collections = [
    {
      name: "equipoise",
      address: "0x20B0d3D43e69d253b7DE97bC3a55Bc69e663Edef",
    },
    {
      name: "rtfkt x rimowa meta-artisan collection",
      address: "0x47893ab13E27CdAB213C12623A2CbF4409b7465a",
    },
  ];

  const foundCollections =
    searchInput.length > 0
      ? collections.filter((collection) =>
          collection.name.match(searchInput.toLowerCase())
        )
      : [];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (foundCollections.length > 0) return setResultOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseResult = () => setResultOpen(false);
  const refResult = useOutsideClick(handleCloseResult);
  const ref = useOutsideClick(handleClose);
  return (
    <div className="sticky top-0 z-10 flex w-full bg-white py-2 px-10 shadow-lg">
      <Link href="/">
        <div className="flex cursor-pointer items-center gap-5">
          <Image src={logo} alt="logo" width={40} height={40} />
          <p className={textStyle}>OpenSea</p>
        </div>
      </Link>
      <div
        className="relative mx-10 flex flex-1 items-center gap-10 rounded-[0.8rem] bg-[#363840]"
        onClick={() => setResultOpen(true)}
      >
        <AiOutlineSearch className="mx-3 text-lg font-bold text-gray-500" />
        <input
          type="search"
          className="h-4 w-full border-0 bg-transparent px-2  pl-0 text-gray-300 outline-0 placeholder:text-[#8a939b]"
          placeholder="Search items, collections, and accounts"
          onChange={handleChange}
        />
        <div
          className={`${
            resultOpen ? "absolute top-14" : "hidden"
          } flex w-full flex-col rounded-lg bg-white shadow-lg`}
          ref={refResult}
        >
          {React.Children.toArray(
            foundCollections.map((collection) => (
              <Link
                href={`/collections/${collection.address}`}
                className="py-2 pl-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-slate-500"
              >
                <p className="">{collection.name}</p>
              </Link>
            ))
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        {React.Children.toArray(
          navigations.map((navigation) => (
            <Link
              href={`/${navigation.toLowerCase()}`}
              // onClick={() => setResultOpen(false)}
            >
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
