import { type Collection } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { type AuctionListing, type DirectListing } from "@thirdweb-dev/sdk";

interface Props {
  collection: Collection | undefined;
  listings: (AuctionListing | DirectListing)[];
}
const styles = {
  text: `font-slate-900 text-m`,
  dataText: `font-slate-900 text-m font-bold`,
};

const CollectionPage: React.FC<Props> = ({ collection, listings }) => {
  const srcForBackground =
    collection?.bannerImage !== undefined ? collection?.bannerImage : "";
  const srcForProfileIMG =
    collection?.profileImage !== undefined ? collection?.profileImage : "";

  return (
    <>
      <div className="relative my-20 h-80 w-full">
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
        <div className="my-5 flex gap-4">
          <p className={styles.text}>
            Items <span className={styles.dataText}>{listings?.length}</span>
          </p>
          <p className={styles.text}>
            Chain <span className={styles.dataText}>Mumbai</span>
          </p>
        </div>
        <p className={styles.text}>{collection?.description}</p>
      </div>
    </>
  );
};

export default CollectionPage;
