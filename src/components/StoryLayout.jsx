// StoryLayout.jsx
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

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 min-h-screen bg-black px-4 py-6">
      <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white bg-black">
        <div className="absolute top-2 left-2 right-2 h-1 bg-white/30 z-10">
          <div ref={progressRef} className="h-full bg-white animate-progress" />
        </div>

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

      {next && (
        <div className="hidden md:flex flex-col items-center justify-center">
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
