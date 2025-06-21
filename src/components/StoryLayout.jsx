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

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const progressEl = progressRef.current;
    if (!progressEl) return;

    if (isPaused) {
      progressEl.style.animationPlayState = "paused";
      return;
    }

    progressEl.style.animation = "none";
    void progressEl.offsetWidth;
    progressEl.style.animation = "progressBar 10s linear forwards";
    progressEl.style.animationPlayState = "running";

    const timer = setTimeout(() => {
      if (currentIndex < shuffledStories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex, shuffledStories.length, isPaused]);


  return (
    <div className="w-screen max-w-[420px] sm:max-w-[480px] lg:max-w-[520px] xl:max-w-[600px] mx-auto flex justify-between items-center gap-3 px-2 py-6 min-h-screen bg-black">
      <div className="w-[68%] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white bg-black relative">
        <div className="absolute top-[6px] left-[6px] right-[6px] h-[2px] bg-white/30 z-50 rounded overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white animate-progressBar transform origin-left"
          />
        </div>

        {current?.type === "ad" ? (
          <AdViewer
            id={current.id}
            contentImg={current.contentImg}
            section={current?.section}
            profileImg={current.profileImg}
            username={current.username}
            setIsPaused={setIsPaused}
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
