const SkeletonTable: React.FC = () => {
  const repeatCount = 3;
  return (
    <>
      <div className="col-span-2 h-10 w-3/5 rounded-xl bg-gray-200" />
      {Array.from({ length: repeatCount }).map((_, index) => (
        <div
          className="ml-auto h-10 w-2/3 animate-pulse rounded-xl bg-gray-200"
          key={index}
        />
      ))}
    </>
  );
};

export default SkeletonTable;
