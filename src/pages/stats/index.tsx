import { type NextPage } from "next";
import React from "react";
import { prisma } from "../../server/db/client";
import { type Collection } from "@prisma/client";

interface StatsProps {
  collections: Collection[];
}

const Stats: NextPage<StatsProps> = ({ collections }) => {
  return (
    <div>
      {React.Children.toArray(
        collections.map((collection) => (
          <p className="text-slate-900">{collection.title}</p>
        ))
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const collections = await prisma.collection.findMany();
  return {
    props: {
      collections: JSON.parse(JSON.stringify(collections)),
    },
  };
};

export default Stats;
