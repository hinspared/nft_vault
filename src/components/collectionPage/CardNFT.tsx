import { type AuctionListing, type DirectListing } from "@thirdweb-dev/sdk";
import Image from "next/image";
import React from "react";

interface CardNFTProps {
  listing: DirectListing | AuctionListing | undefined;
  onClick: () => void;
  disabled: boolean;
}

const CardNFT: React.FC<CardNFTProps> = ({ listing, onClick, disabled }) => {
  const asset = listing?.asset;
  const src = typeof asset?.image === "string" ? asset?.image : "";

  return (
    <div className=" my-5 flex h-64 w-64 flex-col rounded-lg shadow-lg">
      <div className="relative h-4/5 w-full overflow-hidden rounded-t-lg">
        <Image
          className="duration-500 hover:scale-125"
          loader={() => src}
          src={src}
          alt={`${asset?.name}`}
          fill
          unoptimized
        />
      </div>
      <div className="my-5 mx-3 flex flex-col">
        <p className="font-bold text-black">{asset?.name}</p>
        <p className="font-bold text-black">
          {listing?.buyoutCurrencyValuePerToken.displayValue}{" "}
          {listing?.buyoutCurrencyValuePerToken.symbol}
        </p>
        <button className="p-3" onClick={onClick} disabled={disabled}>
          Buy now
        </button>
      </div>
    </div>
  );
};

export default CardNFT;
