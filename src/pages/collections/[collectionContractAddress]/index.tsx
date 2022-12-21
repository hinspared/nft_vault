import React from "react";
import { useRouter } from "next/router";
import { type Collection } from "@prisma/client";
import {
  ThirdwebSDK,
  type AuctionListing,
  type DirectListing,
  type NFT,
} from "@thirdweb-dev/sdk";
import { type NextPage, type GetServerSideProps } from "next";
import { prisma } from "../../../server/db/client";
import CollectionPage from "../../../components/collectionPage/CollectionPage";
import CardNFT from "../../../components/collectionPage/CardNFT";
import {
  useContract,
  useNetwork,
  ChainId,
  useAddress,
  useChainId,
} from "@thirdweb-dev/react";

interface CollectionPageProps {
  collections: Collection[];
  listings: (AuctionListing | DirectListing)[];
}

const Collection: NextPage<CollectionPageProps> = ({
  collections,
  listings,
}) => {
  const router = useRouter();
  const { collectionContractAddress } = router.query;
  const collection = collections.find(
    (collection) => collection.contractAddress === collectionContractAddress
  );
  // Buying NFT functionality
  const { contract: marketplace } = useContract(
    "0xee0a43f14299e356d8912373eF3491Ce164f39a9",
    "marketplace"
  );
  const address = useAddress();
  const chain = useChainId();
  const disabled = address !== undefined ? false : true;
  const [, switchNetwork] = useNetwork();
  const handleClick = async (listingId: string, quantityDesired = 1) => {
    try {
      chain === 80001
        ? await marketplace?.buyoutListing(listingId, quantityDesired)
        : switchNetwork?.(ChainId.Mumbai);
    } catch (e) {
      if (typeof e === "string") {
        e.toUpperCase();
      } else if (e instanceof Error) {
        alert(e.message);
      }
    }
  };
  return (
    <>
      <CollectionPage collection={collection} listings={listings} />
      <div className="flex flex-wrap justify-center gap-10">
        {React.Children.toArray(
          listings?.map((listing) => {
            return (
              <CardNFT
                listing={listing}
                onClick={() => handleClick(listing.asset.id)}
                disabled={disabled}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { collectionContractAddress } = context.query;
  const collections = await prisma.collection.findMany();

  // Get active listings of the collection
  const sdk = new ThirdwebSDK("mumbai");
  const collectionAddress =
    typeof collectionContractAddress === "string"
      ? collectionContractAddress
      : "0x20B0d3D43e69d253b7DE97bC3a55Bc69e663Edef";
  const marketplace = await sdk.getContract(
    "0xee0a43f14299e356d8912373eF3491Ce164f39a9",
    "marketplace"
  );
  const collection = await sdk.getContract(collectionAddress, "nft-collection");
  const NFTs = await collection.getAll();
  const listings = await marketplace.getActiveListings();
  const names = NFTs?.map((NFT: NFT) => NFT.metadata.name);
  const listingsOfCollection = listings?.filter((listing) =>
    names?.includes(listing.asset.name)
  );
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
      listings: JSON.parse(JSON.stringify(listingsOfCollection)),
    },
  };
};
