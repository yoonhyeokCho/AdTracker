import StoryFooter from "./StoryFooter";

const StoryViewer = ({ username, profileImg, contentImg, time }) => {
  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
      <img
        src={contentImg}
        className="w-full h-full object-cover object-center"
        alt="story"
      />

      {/* 상단 프로필 */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-white text-sm z-10">
        <img src={profileImg} className="w-8 h-8 rounded-full" alt="profile" />
        <div>
          <div className="font-semibold">{username}</div>
          <div className="text-xs opacity-80">{time}</div>
        </div>
      </div>

      {/* 하단 입력창 */}
      <StoryFooter username={username} />
    </div>
  );
};

export default StoryViewer;
