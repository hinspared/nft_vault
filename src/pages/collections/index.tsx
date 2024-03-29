import React from "react";
import { type Collection } from "@prisma/client";
import { type NextPage } from "next";
import CollectionCard from "../../components/collections/CollectionCard";
import Link from "next/link";
import fetchCollections from "../../utils/helpers/fetchCollections";
import { useQuery } from "react-query";
import Head from "next/head";
import SkeletonCollections from "../../components/collections/SkeletonCollections";

const CollectionsPage: NextPage = () => {
  const { data: collections, isLoading } = useQuery(
    "collections",
    fetchCollections
  );
  return (
    <>
      <Head>
        <title>NFT collections</title>
        <meta name="description" content="NFT collections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-10 my-20 flex ">
        <p className="text-4xl font-bold text-slate-900">Explore collections</p>
      </div>
      {isLoading ? (
        <SkeletonCollections />
      ) : (
        <div className="my-5 flex flex-wrap justify-center gap-10 px-10">
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
                  createdAt={collection.createdAt}
                  sales={collection.sales}
                  nfts={collection.nfts}
                />
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default CollectionsPage;
