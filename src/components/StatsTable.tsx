import { type Collection } from "@prisma/client";
import Image from "next/image";
import React from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

interface StatsTableProps {
  collections: Collection[];
  active: string;
  onClick: (e: React.MouseEvent) => void;
}

interface ArrowProps {
  active: boolean;
  direction: string;
}
const stats = ["VOLUME", "FLOOR PRICE", "SALES"];

const Arrow: React.FC<ArrowProps> = ({ active, direction }) =>
  !active ? (
    <TiArrowUnsorted className="text-slate-600" />
  ) : direction === "UP" ? (
    <TiArrowSortedDown />
  ) : (
    <TiArrowSortedUp />
  );

const StatsTable: React.FC<StatsTableProps> = ({
  collections,
  active,
  onClick,
}) => {
  return (
    <>
      <div className="mx-10 my-20 flex ">
        <p className="text-4xl font-bold text-slate-900">Collection stats</p>
      </div>
      <div className="mx-auto grid w-4/5 grid-cols-5 items-center gap-y-10">
        <p className="col-span-2 ml-20 text-slate-600">COLLECTION</p>
        {React.Children.toArray(
          stats.map((stat) => (
            <div className="flex justify-end">
              <div
                className="flex cursor-pointer items-center"
                onClick={onClick}
              >
                <p
                  className={`text-${
                    active.includes(stat)
                      ? "zinc-900 font-semibold"
                      : "slate-600"
                  }`}
                >
                  {stat}
                </p>
                <Arrow
                  active={active.includes(stat)}
                  direction={active.slice(-2)}
                />
              </div>
            </div>
          ))
        )}
        {React.Children.toArray(
          collections.map((collection, i) => (
            <>
              <div className="col-span-2 flex items-center space-x-5">
                <div className="w-3">
                  <p className="text-slate-600">{i + 1}</p>
                </div>
                <Image
                  src={collection.profileImage}
                  width={60}
                  height={60}
                  alt={collection.title}
                  className="rounded-xl"
                />
                <p className="text-slate-900">{collection.title}</p>
              </div>
              <div className="flex justify-end">
                <p className="text-slate-900">
                  {Number(collection.volumeTraded)} MATIC
                </p>
              </div>
              <div className="flex justify-end">
                <p className="text-slate-900">
                  {Number(collection.floorPrice)} MATIC
                </p>
              </div>
              <div className="flex justify-end">
                <p className="text-slate-900">{collection.sales}</p>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default StatsTable;
