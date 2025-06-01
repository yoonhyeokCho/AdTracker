import { useEffect, useState } from "react";
import { sections } from "./data/sections";
import StoryLayout from "./components/StoryLayout";
import LoginPage from "./pages/LoginPage";

function App() {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    const options = ["a", "b", "c", "d"];
    const random = options[Math.floor(Math.random() * options.length)];
    setSelectedSection(random);
  }, []);

  if (!user) return <LoginPage onLogin={setUser} />;
  if (!selectedSection) return <div>로딩 중...</div>;

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
