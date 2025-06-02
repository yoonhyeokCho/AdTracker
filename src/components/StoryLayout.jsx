import { useState, useMemo, useEffect, useRef } from "react";
import StoryViewer from "./StoryViewer";
import StoryPreview from "./StoryPreview";
import AdViewer from "./AdViewer";

const StoryLayout = ({ stories }) => {
  const shuffledStories = useMemo(() => {
    const storyList = stories.filter((item) => item.type === "story");
    const adList = stories.filter((item) => item.type === "ad");
    const result = [...storyList];
    adList.forEach((ad) => {
      const insertIndex = Math.floor(Math.random() * (result.length + 1));
      result.splice(insertIndex, 0, ad);
    });
    return result;
  }, [stories]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const progressRef = useRef(null);

  const current = shuffledStories[currentIndex];
  const next = shuffledStories[currentIndex + 1];

  useEffect(() => {
    if (!progressRef.current) return;

    // Restart animation
    progressRef.current.style.animation = "none";
    void progressRef.current.offsetWidth;
    progressRef.current.style.animation = "progressBar 10s linear forwards";

    const timer = setTimeout(() => {
      if (currentIndex < shuffledStories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, shuffledStories.length]);

  return (
    <div className="w-screen max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] mx-auto flex justify-between items-center gap-3 px-2 py-6 min-h-screen bg-black">
      {/* 메인 스토리 카드 */}
      <div className="w-[68%] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white bg-black relative">
        {/* 인스타처럼 상단 바 살짝 아래 */}
        <div className="absolute top-[6px] left-[6px] right-[6px] h-[2px] bg-white/30 z-50 rounded overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white animate-progressBar transform origin-left"
          />
        </div>

        {/* 콘텐츠 */}
        {current?.type === "ad" ? (
          <AdViewer
            id={current.id}
            contentImg={current.contentImg}
            section={current?.section}
          />
        ) : (
          <StoryViewer
            username={current?.username}
            profileImg={current?.profileImg}
            contentImg={current?.contentImg}
            time={current?.time}
          />
        )}
      </div>

      {/* 다음 스토리 미리보기 */}
      {next && (
        <div className="w-[28%] aspect-[9/16] rounded-xl overflow-hidden border border-white/50">
          <StoryPreview
            username={next.username}
            profileImg={next.profileImg}
            contentImg={next.contentImg}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default StoryLayout;
