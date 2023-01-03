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
  const buttonStyle = `flex w-full items-center justify-center rounded-b-lg ${
    disabled ? "bg-slate-500" : "bg-sky-600 cursor-pointer"
  }`;
  const lightningStyle = `text-gray-50 ${disabled ? "hidden" : ""}`;

  return (
    <div className="my-5 flex h-72 w-52 flex-col rounded-lg shadow-lg md:h-96 md:w-72">
      <div className="relative h-4/5 w-full overflow-hidden rounded-t-lg">
        <Image
          className="duration-500 hover:scale-125"
          src={src}
          alt={`${asset?.name}`}
          fill
        />
      </div>
      <div className="my-5 mx-3 flex flex-col">
        <p className="font-medium text-black">{asset?.name}</p>
        <p className="font-medium text-black">
          {listing?.buyoutCurrencyValuePerToken.displayValue}{" "}
          {listing?.buyoutCurrencyValuePerToken.symbol}
        </p>
      </div>
      <div className={buttonStyle} onClick={onClick}>
        <BsLightningChargeFill className={lightningStyle} />
        <button className="p-2 text-gray-50" disabled={disabled}>
          Buy now
        </button>
      </div>
    </div>
  );
};

export default CardNFT;
