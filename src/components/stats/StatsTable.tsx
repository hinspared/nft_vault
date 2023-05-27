import React from "react";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import useMobile from "../../utils/hooks/useMobile";

interface StatsTableProps {
  children: React.ReactNode;
  active: string;
  onClick: (e: React.MouseEvent) => void;
}
interface ArrowProps {
  active: boolean;
  direction: string;
}

const Arrow: React.FC<ArrowProps> = ({ active, direction }) =>
  !active ? (
    <TiArrowUnsorted className="text-slate-600" />
  ) : direction === "UP" ? (
    <TiArrowSortedDown />
  ) : (
    <TiArrowSortedUp />
  );
const StatsTable: React.FC<StatsTableProps> = ({
  children,
  active,
  onClick,
}) => {
  const isMobile = useMobile();
  const stats = [
    {
      name: "VOLUME",
      key: "volumeTraded",
    },
    {
      name: "FLOOR PRICE",
      key: "floorPrice",
    },
    {
      name: "Sales",
      key: "sales",
    },
  ];

  return (
    <>
      <div className="mx-10 my-20 flex ">
        <p className="text-4xl font-bold text-slate-900">Collection stats</p>
      </div>
      <div className="mx-auto grid w-4/5 grid-cols-3 items-center gap-y-10 md:grid-cols-5">
        <p className="col-span-2 ml-20 text-slate-600">COLLECTION</p>
        {React.Children.toArray(
          stats.map((stat) => (
            <div
              className={`${
                !isMobile || stat.name === "VOLUME" ? "" : "hidden"
              } flex justify-end`}
            >
              <div
                className="flex cursor-pointer items-center"
                onClick={onClick}
                data-value={stat.key}
              >
                <p
                  className={`text-${
                    active.includes(stat.key)
                      ? "zinc-900 font-semibold"
                      : "slate-600"
                  }`}
                >
                  {stat.name}
                </p>
                <Arrow
                  active={active.includes(stat.key)}
                  direction={active.slice(-2)}
                />
              </div>
            </div>
          ))
        )}
        {children}
      </div>
    </>
  );
};

export default StatsTable;
