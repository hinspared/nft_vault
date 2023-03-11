import { Dialog, Transition } from "@headlessui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import { MdOutlineExplore, MdKeyboardArrowRight } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  navigations: string[];
}

const StatIcon: React.FC<{ navigation: string }> = ({ navigation }) =>
  navigation.toLowerCase() === "collections" ? (
    <MdOutlineExplore />
  ) : (
    <IoStatsChart />
  );

const DialogMobile: React.FC<DialogProps> = ({
  open,
  onClose,
  navigations,
}) => {
  return (
    <Transition
      show={open}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-100 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-100 opacity-0"
      as={React.Fragment}
    >
      <Dialog
        onClose={onClose}
        open={open}
        className="absolute bottom-[-3rem] z-30 h-full w-full bg-white"
      >
        <Dialog.Panel className="h-full">
          <div className="mt-10 flex flex-col justify-center gap-10 p-5">
            {React.Children.toArray(
              navigations.map((navigation) => (
                <Link
                  href={`/${navigation}`}
                  onClick={onClose}
                  className="outline-none"
                >
                  <div className="flex items-center gap-3">
                    <StatIcon navigation={navigation} />
                    <p className="text-2xl text-slate-900 ">{navigation}</p>
                    <MdKeyboardArrowRight className="ml-auto" />
                  </div>
                </Link>
              ))
            )}
            <ConnectWallet accentColor="#0284c7" />
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default DialogMobile;
