import { type Collection } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { escapeRegExp } from "../../../utils/helpers/escapeRegExp";
import useOutsideClick from "../../../utils/hooks/clickoutsideComponent";

const MobileSearchbar: React.FC<{ collections: Collection[] }> = ({
  collections,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isResultOpen, setResultOpen] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  const foundCollections: Collection[] = collections.filter(
    (collection: Collection) => {
      if (searchInput.length === 0) return;
      return collection.title
        .toLowerCase()
        .match(escapeRegExp(searchInput.toLowerCase()));
    }
  );

  // input and result handlers
  const handleCloseResult = () => {
    setResultOpen(false);
    setSearchInput("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (collections.length > 0) setResultOpen(true);
  };
  const ref = useOutsideClick(handleCloseResult);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={`${isOpen ? "" : "hidden"} absolute z-30 flex
         h-14 flex-1 items-center rounded-xl bg-white`}
      >
        <div className="flex h-full items-center" onClick={handleClose}>
          <MdKeyboardArrowRight className="text-2xl text-gray-500" />
        </div>
        <div className="flex w-full items-center rounded-xl border-2 border-slate-400 px-3">
          <AiOutlineSearch className="text-lg font-bold text-gray-500" />
          <input
            type="search"
            className="h-10 w-full border-0 border-transparent px-2 pl-1 text-slate-900 outline-none placeholder:text-[#8a939b]"
            placeholder="Search collections"
            onChange={handleChange}
            value={searchInput}
          />
        </div>
        <div
          className={`${
            isResultOpen ? "absolute top-14" : "hidden"
          } flex w-full flex-col rounded-lg bg-white shadow-lg`}
          ref={ref}
        >
          {React.Children.toArray(
            foundCollections.map((collection) => (
              <Link
                href={`/collections/${collection.contractAddress}`}
                className="py-2 pl-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-slate-500"
                onClick={handleClose}
              >
                <p className="">{collection.title}</p>
              </Link>
            ))
          )}
        </div>
      </div>
      <AiOutlineSearch className="ml-auto text-2xl" onClick={handleClick} />
    </>
  );
};

export default MobileSearchbar;
