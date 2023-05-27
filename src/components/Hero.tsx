import { useAddress, useMetamask } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  return (
    <div className="relative">
      <div
        className={`before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-red-500 before:bg-[url('https://res.cloudinary.com/dzuizm2g3/image/upload/v1684859781/d634add7b54c21afa993923252751b5f_wjw5ax.webp')] before:bg-cover before:bg-center before:opacity-30 before:blur before:content-['']`}
      >
        <div className="relative flex h-[90vh] flex-col items-center justify-center">
          <div className="relative mb-10 w-3/5 text-center text-2xl font-semibold text-white md:text-5xl">
            Discover, collect and sell extraordinary NFTs
          </div>
          <div className="flex gap-5">
            <Link href="/collections">
              <button className="relative cursor-pointer rounded-lg bg-sky-600 px-12 py-4 text-lg font-semibold text-white hover:bg-sky-500">
                Explore
              </button>
            </Link>
            <button
              className={`${
                address ? "hidden" : "relative"
              } cursor-pointer rounded-lg bg-[#363840] px-12 py-4 text-lg font-semibold text-[#e4e8ea] hover:bg-[#4c505c]`}
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

export default Hero;
