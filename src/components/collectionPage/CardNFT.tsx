import { type AuctionListing, type DirectListing } from "@thirdweb-dev/sdk";
import Image from "next/image";
import React from "react";
import { BsLightningChargeFill } from "react-icons/bs";

interface CardNFTProps {
  listing: DirectListing | AuctionListing | undefined;
  onClick: () => void;
  disabled: boolean;
}

const CardNFT: React.FC<CardNFTProps> = ({ listing, onClick, disabled }) => {
  const asset = listing?.asset;
  const src = typeof asset?.image === "string" ? asset?.image : "";

  return (
    <div className="my-5 flex h-72 w-52 flex-col rounded-lg shadow-lg md:h-96 md:w-72">
      <div className="relative h-4/5 w-full overflow-hidden rounded-t-lg">
        <Image
          className="duration-500 hover:scale-125"
          src={src}
          alt={`${asset?.name}`}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
      </div>
      <div className="my-5 mx-3 flex flex-col">
        <p className="font-medium text-black">{asset?.name}</p>
        <p className="font-medium text-black">
          {listing?.buyoutCurrencyValuePerToken.displayValue}{" "}
          {listing?.buyoutCurrencyValuePerToken.symbol}
        </p>
      </div>
      <div
        className={`flex w-full items-center justify-center rounded-b-lg ${
          disabled ? "bg-slate-500" : "cursor-pointer bg-sky-600"
        }`}
        onClick={onClick}
      >
        <BsLightningChargeFill
          className={`text-gray-50 ${disabled ? "hidden" : ""}`}
        />
        <button className="p-2 text-gray-50">
          {disabled ? "Connect wallet" : "Buy now"}
        </button>
      </div>
    </div>
  );
};

export default CardNFT;
