import { type Collection } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useMobile from "../../utils/hooks/useMobile";

const TableRow: React.FC<{ collection: Collection; index: number }> = ({
  collection,
  index,
}) => {
  const isMobile = useMobile();

  return (
    <>
      <div className="col-span-2 flex items-center space-x-5">
        <div className="w-3">
          <p className="text-slate-600">{index + 1}</p>
        </div>
        <Link
          href={`/collections/${collection.contractAddress}`}
          className="flex items-center space-x-5"
        >
          <Image
            src={collection.profileImage}
            width={60}
            height={60}
            alt={collection.title}
            className="rounded-xl"
          />
          <p className="text-slate-900">{collection.title}</p>
        </Link>
      </div>
      <div className="flex justify-end">
        <p className="text-slate-900">
          {Number(collection.volumeTraded)} MATIC
        </p>
      </div>
      {!isMobile && (
        <>
          <div className="flex justify-end">
            <p className="text-slate-900">
              {Number(collection.floorPrice)} MATIC
            </p>
          </div>
          <div className="flex justify-end">
            <p className="text-slate-900">{collection.sales}</p>
          </div>
        </>
      )}
    </>
  );
};

export default TableRow;
