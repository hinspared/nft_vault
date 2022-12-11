import React from "react";
import { type Collection } from "@prisma/client";
import { type NextPage } from "next";
import { prisma } from "../../server/db/client";
import { useContract } from "@thirdweb-dev/react";
import {
  type AuctionListing,
  type DirectListing,
} from "@thirdweb-dev/sdk/dist/declarations/src/evm/types";
import CollectionCard from "../../components/CollectionCard";
import Link from "next/link";

interface CollectionsPageProps {
  collections: Collection[];
}
const CollectionsPage: NextPage<CollectionsPageProps> = ({ collections }) => {
  const [listings, setListings] = React.useState<
    (AuctionListing | DirectListing)[] | undefined
  >();
  const { contract } = useContract(
    "0x6C63679704fbE16BAcDc3CbE130FDB6333b6F02c",
    "marketplace"
  );
  React.useEffect(() => {
    const getListings = async () => {
      const listings = await contract?.getAllListings();
      setListings(listings);
    };
    getListings();
  }, [contract]);
  const listing = listings?.findIndex(
    (el) => el.asset.name === "EQUIPOISE 006"
  );
  const names = listings?.map((listing) => listing.asset.name);
  console.log(collections, names, listing);
  return (
    <>
      <div className="mx-10 my-5 flex ">
        <p className="text-2xl font-bold text-slate-900">Explore collections</p>
      </div>

      <div className="mx-10 my-5 flex justify-center">
        {React.Children.toArray(
          collections.map((collection: Collection) => (
            <Link href={`/collections/${collection.contractAddress}`}>
              <CollectionCard
                id={collection.id}
                title={collection.title}
                contractAddress={collection.contractAddress}
                description={collection.description}
                volumeTraded={collection.volumeTraded}
                floorPrice={collection.floorPrice}
                profileImage={collection.profileImage}
                bannerImage={collection.bannerImage}
              />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const collections = await prisma.collection.findMany();
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
}

export default CollectionsPage;
