import Link from "next/link";
import React from "react";
import { IoMdWallet } from "react-icons/io";
import { ConnectWallet } from "@thirdweb-dev/react";
import useOutsideClick from "../../../utils/hooks/clickoutsideComponent";

interface NavigationProps {
  open: boolean;
  onClick: () => void;
  onClose: () => void;
  navigations: string[];
}
const textStyle = `text-sm md:text-2xl font-semibold text-slate-900 hover:text-gray-300 cursor-pointer`;

const NavigationComponent: React.FC<NavigationProps> = ({
  open = false,
  onClick,
  onClose,
  navigations,
}) => {
  const ref = useOutsideClick(onClose);

  return (
    <div className="z-30 flex items-center gap-4">
      {React.Children.toArray(
        navigations.map((navigation) => (
          <Link href={`/${navigation}`}>
            <p className={textStyle}>{navigation}</p>
          </Link>
        ))
      )}
      <div className="relative" ref={ref}>
        <IoMdWallet className={textStyle} onClick={onClick} />
        <div
          className={`absolute left-[-10rem] top-[2.7rem] ${
            open ? "" : "hidden"
          }`}
        >
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default NavigationComponent;
