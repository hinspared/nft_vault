import React from "react";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="relative -z-10 my-5 h-56 w-full animate-pulse bg-gray-300 md:h-80">
        <div className="absolute bottom-[-4rem] left-5 flex h-36 w-36 justify-center  rounded-xl bg-white md:h-56 md:w-56">
          <div className="mx-2 my-2 h-[90%] w-[90%] rounded-xl bg-gray-300"></div>
        </div>
      </div>
      <div className="my-20 flex h-full w-full animate-pulse flex-row items-center space-x-5">
        <div className="flex w-full flex-col space-y-3">
          <div className="h-8 w-3/5 rounded-full bg-gray-300 "></div>
          <div className="h-6 w-3/5 rounded-full bg-gray-300 "></div>
          <div className="h-6 w-2/5 rounded-full bg-gray-300 "></div>
          <div className="h-6 w-2/5 rounded-full bg-gray-300 "></div>
        </div>
      </div>
    </>
  );
};
export default LoadingSkeleton;
