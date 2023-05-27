import React from "react";

const SkeletonCollections = () => {
  const repeatCount = 3;
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {Array.from({ length: repeatCount }).map((_, index) => (
        <div
          className="my-5 flex h-56 w-40 flex-col rounded-lg shadow-lg md:h-72 md:w-80"
          key={index}
        >
          <div className="h-4/5 w-full animate-pulse rounded-t-lg bg-gray-200" />
          <div className="my-5 flex h-14 justify-center">
            <div className="h-full w-3/4 animate-pulse bg-gray-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCollections;
