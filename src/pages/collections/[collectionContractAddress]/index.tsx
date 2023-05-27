import React from "react";
import { useRouter } from "next/router";
import { Prisma, type Collection } from "@prisma/client";
import { type NextPage } from "next";
import CollectionPage from "../../../components/collectionPage/CollectionPage";
import CardNFT from "../../../components/collectionPage/CardNFT";
import {
  useContract,
  useNetwork,
  ChainId,
  useAddress,
  useChainId,
  useActiveListings,
  useMetamask,
} from "@thirdweb-dev/react";
import SkeletonCollectionPage from "../../../components/collectionPage/SkeletonCollectionPage";
import { type Decimal } from "@prisma/client/runtime";
import { useQuery } from "react-query";
import fetchCollections from "../../../utils/helpers/fetchCollections";
import Head from "next/head";
import { toast } from "react-hot-toast";
import SkeletonCardsNFT from "../../../components/collectionPage/SkeletonCardsNFT";

const Collection: NextPage = () => {
  const router = useRouter();
  const { collectionContractAddress } = router.query;
  const { data: collections, isLoading: collectionLoading } = useQuery(
    "collections",
    fetchCollections
  );
  const collection = collections
    ? collections.find(
        (collection: Collection) =>
          collection.contractAddress === collectionContractAddress
      )
    : null;
  const collectionAddress =
    typeof collectionContractAddress === "string"
      ? collectionContractAddress
      : "wrong";

  // Get all active listings
  const { contract: marketplace } = useContract(
    "0x5cB3587A1066E63e1F1f95e31dAB06b4c24AA2A2",
    "marketplace"
  );
  const { data: activeListings, isLoading: NFTLoading } =
    useActiveListings(marketplace);

  const listings = activeListings?.filter((listing) => {
    const name = listing.asset.name as string;
    return collection?.nfts.includes(name);
  });

  // Buying NFT functionality
  const sale = async (volume: Decimal) => {
    await fetch(`/api/collections/${collectionAddress}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        volume,
      }),
    });
  };

  const address = useAddress();
  const chain = useChainId();
  const connectWithMetamask = useMetamask();

  const disabled = address !== undefined ? false : true;
  const [, switchNetwork] = useNetwork();
  const handleClick = async (
    listingId: string,
    volume: Decimal,
    quantityDesired = 1
  ) => {
    // Ensure user is on the correct network
    try {
      chain === 80001
        ? await marketplace?.buyoutListing(listingId, quantityDesired)
        : switchNetwork?.(ChainId.Mumbai);
      await sale(volume);
      toast.success("NFT was successfully bought");
    } catch (e) {
      if (e instanceof Error) {
        if (e.message.includes("user rejected transaction")) {
          toast.error("user rejected transaction");
        } else if (e.message.includes("insufficient funds")) {
          toast.error("insufficient funds");
        } else {
          toast.error(e.message);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>{collection?.title}</title>
        <meta name="description" content="NFT collection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {collectionLoading ? (
        <SkeletonCollectionPage />
      ) : (
        <CollectionPage collection={collection} listings={listings} />
      )}
      {NFTLoading ? (
        <SkeletonCardsNFT />
      ) : (
        <div className="flex flex-wrap justify-center gap-10">
          {React.Children.toArray(
            listings?.map((listing) => {
              const volume = new Prisma.Decimal(
                listing.buyoutCurrencyValuePerToken.displayValue
              );
              return (
                <CardNFT
                  listing={listing}
                  onClick={
                    disabled
                      ? () => connectWithMetamask()
                      : () => handleClick(listing.id, volume)
                  }
                  disabled={disabled}
                />
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default Collection;
