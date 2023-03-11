import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface WarningComponentProps {
  isWarningClosed: boolean;
  onClick: () => void;
}

const WarningComponent: React.FC<WarningComponentProps> = ({
  isWarningClosed,
  onClick,
}) => {
  return (
    <div
      className={`${
        isWarningClosed ? "hidden" : null
      } flex w-full items-center justify-center bg-amber-400 p-1`}
    >
      <p className="font-slate-700 ml-auto pl-4 text-sm">
        Please connect your wallet and use{" "}
        <a
          href="https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f#:~:text=Connect%20Metamask%20to%20Polygon%20Testnet,the%20Mumbai%20Testnet%20in%20Metamask."
          className="underline decoration-solid hover:text-gray-500"
          target="_blank"
          rel="noreferrer"
        >
          the test network (Mumbai)
        </a>
      </p>
      <AiOutlineClose
        className="mr-4 ml-auto cursor-pointer hover:text-gray-500"
        onClick={onClick}
      />
    </div>
  );
};

export default WarningComponent;
