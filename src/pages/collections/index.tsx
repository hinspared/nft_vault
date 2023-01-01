import React from "react";
import { type Collection } from "@prisma/client";
import { type NextPage } from "next";
import { prisma } from "../../server/db/client";
import CollectionCard from "../../components/CollectionCard";
import Link from "next/link";

interface CollectionsPageProps {
  collections: Collection[];
}
const CollectionsPage: NextPage<CollectionsPageProps> = ({ collections }) => {
  return (
    <>
      <div className="mx-10 my-20 flex ">
        <p className="text-4xl font-bold text-slate-900">Explore collections</p>
      </div>

      <div className="mx-10 my-5 flex justify-center gap-10">
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
