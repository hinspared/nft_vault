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
    <div className="my-5 flex h-96 w-72 flex-col rounded-lg shadow-lg">
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
        <p className="font-medium text-black">{asset?.name}</p>
        <p className="font-medium text-black">
          {listing?.buyoutCurrencyValuePerToken.displayValue}{" "}
          {listing?.buyoutCurrencyValuePerToken.symbol}
        </p>
      </div>
      <div className={buttonStyle} onClick={onClick}>
        <BsLightningChargeFill className={lightningStyle} />
        <button
          className="p-2 text-gray-50"
          // onClick={onClick}
          disabled={disabled}
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default CardNFT;
