import React from "react";
import { useRouter } from "next/router";
import { useContract } from "@thirdweb-dev/react";
import { type Collection } from "@prisma/client";
import Link from "next/link";
import { type NFT } from "@thirdweb-dev/sdk";
import { type NextPage } from "next";
import { prisma } from "../../../server/db/client";
import CollectionPage from "../../../components/CollectionPage";

interface CollectionPageProps {
  collections: Collection[];
}

const Collection: NextPage<CollectionPageProps> = ({ collections }) => {
  // Get all NFTs of collection
  const [NFTs, setNFTs] = React.useState<NFT[]>();
  const router = useRouter();
  const { collectionContractAddress } = router.query;
  const collection = collections.find(
    (collection) => collection.contractAddress === collectionContractAddress
  );
  const { contract } = useContract(
    `${collectionContractAddress}`,
    "nft-collection"
  );
  const href = `/nameNFT`;

  React.useEffect(() => {
    const getNFTs = async () => {
      const NFTs = await contract?.getAll();
      setNFTs(NFTs);
    };
    getNFTs();
  }, [contract]);
  console.log(NFTs);
  return <CollectionPage collection={collection} />;
};

export default Collection;

export async function getServerSideProps() {
  const collections = await prisma.collection.findMany();
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
}
