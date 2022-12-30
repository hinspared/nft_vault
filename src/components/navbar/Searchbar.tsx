import Link from "next/link";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useOutsideClick from "../../utils/hooks/clickoutsideComponent";

const escapeRegExp = (str: string) => {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const Searchbar = () => {
  const [searchInput, setSearchInput] = React.useState("");
  const [resultOpen, setResultOpen] = React.useState(false);
  const handleCloseResult = () => setResultOpen(false);

  const ref = useOutsideClick(handleCloseResult);

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
          collection.name.match(escapeRegExp(searchInput.toLowerCase()))
        )
      : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (foundCollections.length > 0) setResultOpen(true);
  };

  return (
    <div className="relative mx-10 flex flex-1 items-center gap-10 rounded-[0.8rem] bg-[#363840]">
      <AiOutlineSearch className="mx-3 text-lg font-bold text-gray-500" />
      <input
        type="search"
        className="h-5 w-full border-0 bg-transparent px-2  pl-0 text-gray-300 outline-0 placeholder:text-[#8a939b]"
        placeholder="Search items, collections, and accounts"
        onChange={handleChange}
        onFocus={() => setResultOpen(true)}
      />
      <div
        className={`${
          resultOpen ? "absolute top-14" : "hidden"
        } flex w-full flex-col rounded-lg bg-white shadow-lg`}
        ref={ref}
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
  );
};
