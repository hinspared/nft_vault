import { type Collection } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface Props {
  collection: Collection | undefined;
}

const CollectionPage: React.FC<Props> = ({ collection }) => {
  console.log(collection);
  const srcForBackground =
    collection?.bannerImage !== undefined ? collection?.bannerImage : "";
  const srcForProfileIMG =
    collection?.profileImage !== undefined ? collection?.profileImage : "";
  return (
    <>
      <div className="relative my-5 h-80 w-full">
        <Image alt="background" fill unoptimized src={srcForBackground} />
        <div className="absolute bottom-[-4rem] left-5 rounded-xl bg-white">
          <div className="relative h-56 w-56 rounded-xl shadow-2xl">
            <Image
              alt="background"
              fill
              unoptimized
              src={srcForProfileIMG}
              className="rounded-xl p-2"
            />
          </div>
        </div>
      </div>
      <div className="my-20 mx-5 flex flex-col">
        <p className="font-slate-900 text-2xl font-bold">{collection?.title}</p>
      </div>
    </>
  );
};

export default CollectionPage;
