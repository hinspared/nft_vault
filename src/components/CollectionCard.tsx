import React from "react";
import { type Collection } from "@prisma/client";
import Image from "next/image";

const CollectionCard: React.FC<Collection> = ({ title, profileImage }) => {
  const src = profileImage;
  return (
    <div className=" my-5 flex h-72 w-80 flex-col rounded-lg shadow-lg">
      <div className="relative h-4/5 w-full overflow-hidden rounded-t-lg">
        <Image loader={() => src} src={src} alt={`${title}`} fill unoptimized />
      </div>
      <div className="my-5 flex h-14 justify-center">
        <p className="text-center font-bold text-black">{title}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
