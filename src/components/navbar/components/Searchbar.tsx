import Link from "next/link";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useOutsideClick from "../../../utils/hooks/clickoutsideComponent";
import { MdKeyboardArrowRight } from "react-icons/md";
import useSWR from "swr";
import { type Collection } from "@prisma/client";
import { escapeRegExp } from "../../../utils/helpers/escapeRegExp";

interface SearchBarProps {
  mobile?: boolean;
  open?: boolean;
  onClick?: () => void;
}
const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const Searchbar: React.FC<SearchBarProps> = ({
  mobile = false,
  open = true,
  onClick,
}) => {
  const [searchInput, setSearchInput] = React.useState("");
  const [resultOpen, setResultOpen] = React.useState(false);
  const handleCloseResult = () => {
    setResultOpen(false);
    setSearchInput("");
  };
  const ref = useOutsideClick(handleCloseResult);

  const { data: collections } = useSWR("/api/collections", fetcher);

  const foundCollections: Collection[] =
    searchInput.length > 0
      ? collections.filter((collection: Collection) =>
          collection.title
            .toLowerCase()
            .match(escapeRegExp(searchInput.toLowerCase()))
        )
      : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (foundCollections.length > 0) setResultOpen(true);
  };

  return (
    <div
      className={`${mobile ? "absolute z-30 h-14 w-full" : "relative"} ${
        open ? "" : "hidden"
      } flex flex-1 items-center rounded-xl bg-white`}
    >
      <div className="ml-5 flex h-full items-center" onClick={onClick}>
        <MdKeyboardArrowRight
          className={`${mobile ? "" : "hidden"} text-2xl text-gray-500`}
        />
      </div>
      <div className="flex w-full items-center rounded-xl border-2 border-slate-400 px-3">
        <AiOutlineSearch className="text-lg font-bold text-gray-500" />
        <input
          type="search"
          className="h-10 w-full border-0 border-transparent px-2 pl-1 pl-0 text-slate-900 outline-none placeholder:text-[#8a939b]"
          placeholder="Search collections"
          onChange={handleChange}
          onFocus={() => setResultOpen(true)}
          value={searchInput}
        />
      </div>

      <div
        className={`${
          resultOpen ? "absolute top-14" : "hidden"
        } flex w-full flex-col rounded-lg bg-white shadow-lg`}
        ref={ref}
      >
        {React.Children.toArray(
          foundCollections.map((collection) => (
            <Link
              href={`/collections/${collection.contractAddress}`}
              className="py-2 pl-10 [&:not(:last-child)]:border-b-2 [&:not(:last-child)]:border-slate-500"
              onClick={handleCloseResult}
            >
              <p className="">{collection.title}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Searchbar;
