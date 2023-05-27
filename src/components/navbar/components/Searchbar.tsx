import Link from "next/link";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useOutsideClick from "../../../utils/hooks/clickoutsideComponent";
import { type Collection } from "@prisma/client";
import { escapeRegExp } from "../../../utils/helpers/escapeRegExp";
import Image from "next/image";

interface SearchBarProps {
  open?: boolean;
  collections: Collection[];
}

const Searchbar: React.FC<SearchBarProps> = ({ open = true, collections }) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [isResultOpen, setResultOpen] = React.useState(false);

  const foundCollections: Collection[] = collections.filter(
    (collection: Collection) => {
      if (searchInput.length === 0) return;
      return collection.title
        .toLowerCase()
        .match(escapeRegExp(searchInput.toLowerCase()));
    }
  );

  const handleCloseResult = () => {
    setResultOpen(false);
    setSearchInput("");
  };
  const ref = useOutsideClick(handleCloseResult);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (collections.length > 0) setResultOpen(true);
  };

  return (
    <div
      className={`${
        open ? "" : "hidden"
      } relative flex flex-1 items-center rounded-xl bg-white`}
    >
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
              className="flex gap-3 py-2 pl-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-slate-500"
              onClick={handleCloseResult}
            >
              <Image
                src={collection.profileImage}
                alt={collection.title}
                width={30}
                height={30}
                className="rounded-xl"
              />
              <p className="">{collection.title}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Searchbar;
