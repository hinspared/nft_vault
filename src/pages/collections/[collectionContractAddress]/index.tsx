import React from "react";
import { useRouter } from "next/router";
import { Prisma, type Collection } from "@prisma/client";
import { type NextPage } from "next";
import { prisma } from "../../../server/db/client";
import CollectionPage from "../../../components/collectionPage/CollectionPage";
import CardNFT from "../../../components/collectionPage/CardNFT";
import {
  useContract,
  useNetwork,
  ChainId,
  useAddress,
  useChainId,
  useActiveListings,
} from "@thirdweb-dev/react";
import LoadingSkeleton from "../../../components/collectionPage/LoadingSkeleton";
import { type Decimal } from "@prisma/client/runtime";

interface CollectionPageProps {
  collections: Collection[];
}

const Collection: NextPage<CollectionPageProps> = ({ collections }) => {
  const router = useRouter();
  const { collectionContractAddress } = router.query;
  const collection = collections.find(
    (collection) => collection.contractAddress === collectionContractAddress
  );
  const collectionAddress =
    typeof collectionContractAddress === "string"
      ? collectionContractAddress
      : "wrong";

  // Get all active listings
  const { contract: marketplace } = useContract(
    "0x5cB3587A1066E63e1F1f95e31dAB06b4c24AA2A2",
    "marketplace"
  );
  const { data: activeListings, isLoading } = useActiveListings(marketplace);

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
      alert("NFT was successfully bought");
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <CollectionPage collection={collection} listings={listings} />
          <div className="flex flex-wrap justify-center gap-10">
            {React.Children.toArray(
              listings?.map((listing) => {
                const volume = new Prisma.Decimal(
                  listing.buyoutCurrencyValuePerToken.displayValue
                );
                return (
                  <CardNFT
                    listing={listing}
                    onClick={() => handleClick(listing.id, volume)}
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

export const getServerSideProps = async () => {
  const collections = await prisma.collection.findMany();
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};
