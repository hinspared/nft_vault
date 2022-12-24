import React from "react";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="relative -z-10 my-5 h-80 w-full animate-pulse bg-gray-300">
        <div className="absolute bottom-[-4rem] left-5  flex h-56  w-56 justify-center rounded-xl bg-white">
          <div className="mx-2 my-2 h-[90%] w-[90%] rounded-xl bg-gray-300"></div>
        </div>
      </div>
      <div className="mx-5 my-20 flex h-full w-full animate-pulse flex-row items-center space-x-5">
        <div className="flex w-full flex-col space-y-3">
          <div className="h-8 w-96 rounded-full bg-gray-300 "></div>
          <div className="h-6 w-96 rounded-full bg-gray-300 "></div>
          <div className="h-6 w-2/5 rounded-full bg-gray-300 "></div>
          <div className="h-6 w-2/5 rounded-full bg-gray-300 "></div>
        </div>
      </div>
    </>
  );
};
export default LoadingSkeleton;
