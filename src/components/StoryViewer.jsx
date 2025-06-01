import StoryFooter from "./StoryFooter";

const StoryViewer = ({ username, profileImg, contentImg, time }) => {
  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
      <img
        src={contentImg}
        className="w-full h-full object-cover object-center"
        alt="story"
      />

      <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-xs sm:text-sm md:text-base z-10">
        <img
          src={profileImg}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full"
          alt="profile"
        />
        <div>
          <div className="font-semibold text-sm sm:text-base">{username}</div>
          <div className="text-[10px] sm:text-xs opacity-80">{time}</div>
        </div>
      </div>

      {/* 하단 입력창 */}
      <StoryFooter username={username} />
    </div>
  );
};

export default StoryViewer;
