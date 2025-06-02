import { useEffect, useState } from "react";
import { sections } from "./data/sections";
import StoryLayout from "./components/StoryLayout";
import LoginPage from "./pages/LoginPage";
import { preloadImages } from "./utils/preloadImages"; // 위에 만든 함수 import

function App() {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [preloadDone, setPreloadDone] = useState(false);

  useEffect(() => {
    const options = ["a", "b", "c", "d"];
    const random = options[Math.floor(Math.random() * options.length)];
    setSelectedSection(random);
  }, []);

  useEffect(() => {
    if (!selectedSection || !user) return;
    const { stories, ads } = sections[selectedSection];
    const all = [...stories, ...ads];
    preloadImages(all).then(() => {
      setPreloadDone(true);
    });
  }, [selectedSection, user]);

  if (!user) return <LoginPage onLogin={setUser} />;
  if (!selectedSection || !preloadDone)
    return <div className="text-white">로딩 중...</div>;

  const { stories, ads } = sections[selectedSection];
  const content = [...stories];
  ads.forEach((ad) => {
    const insertAt = Math.floor(Math.random() * (content.length + 1));
    content.splice(insertAt, 0, {
      ...ad,
      type: "ad",
      section: selectedSection,
    });
  });

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <StoryLayout stories={content} />
    </div>
  );
}

export default App;
