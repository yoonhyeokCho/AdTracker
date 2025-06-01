import { useEffect, useState } from "react";
import { sections } from "./data/sections";
import StoryLayout from "./components/StoryLayout";
import LoginPage from "./pages/LoginPage";

// ✅ 이미지 preload 함수
const preloadImages = (items) => {
  items.forEach((item) => {
    if (item.contentImg) {
      const img = new Image();
      img.src = item.contentImg;
    }
  });
};

function App() {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  // ✅ 1. 앱 시작 시 랜덤 section 선택
  useEffect(() => {
    const options = ["a", "b", "c", "d"];
    const random = options[Math.floor(Math.random() * options.length)];
    setSelectedSection(random);
  }, []);

  // ✅ 2. section이 준비되면 해당 스토리/광고 이미지 미리 로딩
  useEffect(() => {
    if (!selectedSection) return;
    const { stories, ads } = sections[selectedSection];
    const all = [...stories, ...ads];
    preloadImages(all);
  }, [selectedSection]);

  // ✅ 3. 로그인 전
  if (!user) return <LoginPage onLogin={setUser} />;
  if (!selectedSection) return <div>로딩 중...</div>;

  // ✅ 4. 로그인 후 콘텐츠 구성
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

  // ✅ 5. 렌더링
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <StoryLayout stories={content} />
    </div>
  );
}

export default App;
