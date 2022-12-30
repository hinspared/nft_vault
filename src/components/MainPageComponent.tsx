import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

const MainPageComponent = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <div className="relative">
      <div
        className={`before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-red-500 before:bg-[url('https://i.seadn.io/gcs/files/d634add7b54c21afa993923252751b5f.png?auto=format&w=1920')] before:bg-cover before:bg-center before:opacity-30 before:blur before:content-['']`}
      >
        <div className="relative flex h-[90vh] flex-col items-center justify-center">
          <div className="relative mb-10 w-3/5 text-center text-5xl font-semibold text-white">
            Discover, collect, and sell extraordinary NFTs
          </div>
          <div className="flex">
            <Link href="/collections">
              <button className="relative mr-5 cursor-pointer rounded-lg bg-sky-600 px-12 py-4 text-lg font-semibold text-white hover:bg-sky-500">
                Explore
              </button>
            </Link>
            <button
              className={`${
                address ? "hidden" : "relative"
              } mr-5 cursor-pointer rounded-lg bg-[#363840] px-12 py-4 text-lg font-semibold text-[#e4e8ea] hover:bg-[#4c505c]`}
              onClick={connectWithMetamask}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageComponent;
