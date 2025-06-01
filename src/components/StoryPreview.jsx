import React from "react";

const StoryPreview = ({
  username,
  profileImg,
  contentImg,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`relative w-[16vw] aspect-[9/16] rounded-xl overflow-hidden shadow-lg cursor-pointer border-2 transition-all duration-200 ${
        isActive
          ? "border-white scale-105"
          : "border-transparent opacity-50 hover:opacity-100"
      }`}
      onClick={onClick}
    >
      {/* 미리보기 콘텐츠 이미지 */}
      <img
        src={contentImg}
        alt="preview"
        className="w-full h-full object-cover"
      />

      {/* 가운데 오버레이 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src={profileImg}
          alt="profile"
          className="w-[20%] aspect-square rounded-full border-2 border-white"
        />
        <span className="text-white text-[0.8vw] mt-[0.5vw] bg-black/50 px-[0.6vw] py-[0.3vw] rounded-full">
          {username}
        </span>
      </div>
    </div>
  );
};

export default StoryPreview;
