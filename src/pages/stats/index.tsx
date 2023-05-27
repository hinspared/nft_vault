import { type NextPage } from "next";
import React from "react";
import sortBy from "../../utils/helpers/sortCollections";
import StatsTable from "../../components/stats/StatsTable";
import fetchCollections from "../../utils/helpers/fetchCollections";
import { useQuery } from "react-query";
import Head from "next/head";
import TableRow from "../../components/stats/TableRow";
import { type Collection } from "@prisma/client";
import SkeletonTable from "../../components/stats/SkeletonTable";

const Stats: NextPage = () => {
  const { data: collections, isLoading } = useQuery(
    "collections",
    fetchCollections,
    {
      initialData: [],
    }
  );

  const [active, setActive] = React.useState("");

  // sort functionality
  const [sorted, setSorted] = React.useState<Collection[]>([]);

  React.useEffect(() => {
    if (!isLoading) {
      setSorted(collections);
    }
  }, [collections, isLoading]);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as Element;
    const key = target.getAttribute("data-value") as keyof Collection;
    const up = sortBy(collections, key, "up");
    const down = sortBy(collections, key, "down");
    const condition = JSON.stringify(sorted) === JSON.stringify(up);
    condition ? setSorted(down) : setSorted(up);
    setActive(key);
  };
  return (
    <>
      <Head>
        <title>NFT stats</title>
        <meta name="description" content="NFT stats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StatsTable active={active} onClick={handleClick}>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          React.Children.toArray(
            sorted.map((collection: Collection, index: number) => (
              <TableRow collection={collection} index={index} />
            ))
          )
        )}
      </StatsTable>
    </>
  );
};

export default Stats;
