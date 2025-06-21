const StoryPreview = ({
  username,
  profileImg,
  contentImg,
  onClick,
  isActive,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-full max-w-[160px] aspect-[9/16] rounded-xl overflow-hidden shadow-lg cursor-pointer border transition-all duration-200 ${isActive
          ? "border-white scale-105"
          : "border-transparent opacity-50 hover:opacity-100"
        }`}
    >
      <img src={contentImg} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={profileImg}
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <span className="text-white text-xs mt-2 bg-black/50 px-2 py-1 rounded-full">
          {username}
        </span>
      </div>
    </div>
  );
};

export default StoryPreview;
