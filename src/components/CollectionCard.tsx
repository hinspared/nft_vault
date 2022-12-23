import React from "react";
import { type Collection } from "@prisma/client";
import Image from "next/image";

const CollectionCard: React.FC<Collection> = ({ title, profileImage }) => {
  const src = profileImage;
  return (
    <div className=" my-5 flex h-64 w-80 flex-col rounded-lg shadow-lg">
      <div className="relative h-4/5 w-full overflow-hidden rounded-t-lg">
        <Image loader={() => src} src={src} alt={`${title}`} fill unoptimized />
      </div>
      <div className="my-5 flex justify-center">
        <p className="font-bold text-black">{title}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
