import React from "react";

const SkeletonCardsNFT: React.FC = () => {
  const repeatCount = 4;
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {Array.from({ length: repeatCount }).map((_, index) => (
        <div
          className="my-5 flex h-72 w-52 flex-col rounded-lg shadow-lg md:h-96 md:w-72"
          key={index}
        >
          <div className="h-4/5 w-full rounded-t-lg bg-gray-200" />
          <div className="my-5 mx-3 flex flex-col">
            <div className="mb-1 h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
          <div className="flex w-full items-center justify-center rounded-b-lg bg-gray-200">
            <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCardsNFT;
