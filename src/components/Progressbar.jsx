const ProgressBar = ({ total, current }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={`h-1 flex-1 rounded-full ${
            idx <= current ? "bg-white" : "bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
