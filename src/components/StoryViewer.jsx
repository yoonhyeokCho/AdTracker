// StoryViewer.jsx
import StoryFooter from "./StoryFooter";

const StoryViewer = ({ username, profileImg, contentImg, time }) => {
  return (
    <div className="relative w-full h-full bg-black">
      <img
        src={contentImg}
        alt="story"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute top-3 left-3 flex items-center gap-2 text-white z-10">
        <img
          src={profileImg}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
        <div>
          <div className="font-semibold text-sm md:text-base">{username}</div>
          <div className="text-xs opacity-80">{time}</div>
        </div>
      </div>
      <StoryFooter username={username} />
    </div>
  );
};

export default StoryViewer;
