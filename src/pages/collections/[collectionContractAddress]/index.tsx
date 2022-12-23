import React from "react";
import { useRouter } from "next/router";
import { type Collection } from "@prisma/client";
import {
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
import LoadingSkeleton from "../../../components/collectionPage/LoadingSkeleton";

interface CollectionPageProps {
  collections: Collection[];
}

const Collection: NextPage<CollectionPageProps> = ({ collections }) => {
  const router = useRouter();
  const { collectionContractAddress } = router.query;
  const collection = collections.find(
    (collection) => collection.contractAddress === collectionContractAddress
  );
  const [isLodaing, setLoading] = React.useState(true);
  // get All listings of the collection
  const [listings, setListings] =
    React.useState<(AuctionListing | DirectListing)[]>();

  const collectionAddress =
    typeof collectionContractAddress === "string"
      ? collectionContractAddress
      : "";

  const { contract: nftCollection } = useContract(
    collectionAddress,
    "nft-collection"
  );
  const { contract: marketplace } = useContract(
    "0xee0a43f14299e356d8912373eF3491Ce164f39a9",
    "marketplace"
  );
  React.useEffect(() => {
    const activeListings = async () => {
      const listings = await marketplace?.getActiveListings();
      const nfts = await nftCollection?.getAll();
      const names = nfts?.map((nft: NFT) => nft.metadata.name);
      const listingsOfCollection = listings?.filter((listing) =>
        names?.includes(listing.asset.name)
      );
      setListings(listingsOfCollection);
    };
    activeListings();
    if (listings !== undefined) setLoading(false);
  }, [collectionContractAddress, marketplace, nftCollection, listings]);

  // Buying NFT functionality
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
      {isLodaing ? (
        <LoadingSkeleton />
      ) : (
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
      )}
    </>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps = async () => {
  const collections = await prisma.collection.findMany();
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};
