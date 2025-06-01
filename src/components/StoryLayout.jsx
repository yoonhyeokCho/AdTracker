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

  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.classList.remove("animate-progress");
    void progressRef.current.offsetWidth;
    progressRef.current.classList.add("animate-progress");

    const timer = setTimeout(() => {
      if (currentIndex < shuffledStories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, shuffledStories.length]);

  const current = shuffledStories[currentIndex];
  const next = shuffledStories[currentIndex + 1];

  const goNext = () => {
    if (currentIndex < shuffledStories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-[4vw] h-screen bg-black">
      {/* 본 스토리 카드 */}
      <div className="relative w-[65vw] max-w-[280px] aspect-[9/16] rounded-2xl overflow-hidden border border-white bg-black shadow-lg">
        {/* 프로그레스바 */}
        <div className="absolute top-2 left-3 right-3 h-[0.4vw] bg-white/30 z-10">
          <div ref={progressRef} className="h-full bg-white animate-progress" />
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

      {/* 다음 콘텐츠 preview */}
      {next && (
        <div
          className="w-[40vw] max-w-[160px] aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border border-white shadow-md"
          onClick={goNext}
        >
          <StoryPreview
            username={next.username}
            profileImg={next.profileImg}
            contentImg={next.contentImg}
          />
        </div>
      )}
    </div>
  );
};

export default StoryLayout;
