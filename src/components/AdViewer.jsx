import linkIcon from "../assets/link.png";

const AdViewer = ({ id, section, contentImg, profileImg, username, setIsPaused }) => {
  const handleClick = () => {
    setIsPaused?.(true);

    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const popupWidth = Math.floor(screenWidth * 0.8);
    const popupHeight = Math.floor(popupWidth * 16 / 9);

    const left = Math.floor((screenWidth - popupWidth) / 2);
    const top = Math.floor((screenHeight - popupHeight) / 2);

    const url = `/ad-view/${section}/${id}`;
    const popupOptions = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=no,resizable=yes`;
    const popup = window.open(url, "_blank", popupOptions);

    const checkInterval = setInterval(() => {
      if (popup?.closed) {
        setIsPaused?.(false);
        clearInterval(checkInterval);
      }
    }, 500);
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <img src={contentImg} className="w-full h-full object-cover" alt="ad" />

      {/* 상단 프로필 */}
      <div className="absolute top-3 left-3 flex items-center gap-2 text-white z-10">
        <img
          src={profileImg}
          alt="profile"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full"
        />
        <div>
          <div className="font-semibold text-sm md:text-base">{username}</div>
          <div className="text-xs opacity-80">광고</div>
        </div>
      </div>

      {/* Sponsored */}
      <div className="absolute top-3 right-3 text-white text-xs bg-white/10 px-3 py-1 rounded">
        Sponsored
      </div>

      {/* 버튼 */}
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#EDEDED] rounded-full text-black font-semibold text-sm shadow-sm min-w-[130px] whitespace-nowrap"
        >
          <img src={linkIcon} alt="link" className="w-4 h-4" />
          더 알아보기
        </button>
      </div>
    </div>
  );
};

export default AdViewer;
