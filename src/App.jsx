import { useEffect, useState } from "react";
import { sections } from "./data/sections";
import StoryLayout from "./components/StoryLayout";
import LoginPage from "./pages/LoginPage";
import { preloadImages } from "./utils/preloadImages";
import { trackAdClick } from "./utils/adTrackers";

function App() {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [preloadDone, setPreloadDone] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const options = ["a", "b", "c", "d"];
    const random = options[Math.floor(Math.random() * options.length)];
    setSelectedSection(random);
  }, []);

  useEffect(() => {
    if (!selectedSection || !user) return;

    const { stories, ads } = sections[selectedSection];
    const combined = [...stories];

    ads.forEach((ad) => {
      const insertIndex = Math.floor(Math.random() * (combined.length + 1));
      combined.splice(insertIndex, 0, {
        ...ad,
        type: "ad",
        section: selectedSection,
      });
    });

    setContent(combined);

    const firstFour = combined.slice(0, 4);
    const remaining = combined.slice(4);

    preloadImages(firstFour).then(() => {
      setPreloadDone(true);

      setTimeout(() => {
        preloadImages(remaining);
      }, 1000);
    });

    trackAdClick(user.name, selectedSection, NaN);
  }, [selectedSection, user]);

  if (!user) return <LoginPage onLogin={setUser} />;
  if (!selectedSection || !preloadDone)
    return <div className="text-white">로딩 중...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <StoryLayout stories={content} />
    </div>
  );
}

export default App;
