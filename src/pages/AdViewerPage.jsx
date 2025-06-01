import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sections } from "../data/sections";
import { trackAdClick } from "../utils/adTrackers";

const AdViewerPage = () => {
  const { section, adId } = useParams();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const found = sections[section]?.ads.find((ad) => ad.id === adId);
    if (found) {
      console.log("📌 useEffect 실행됨");
      const found = sections[section]?.ads.find((ad) => ad.id === adId);
      console.log("🔍 찾은 광고:", found);

      setAd(found);

      const name = localStorage.getItem("name") || "anonymous";
      const email = localStorage.getItem("email") || "unknown";
      const gender = localStorage.getItem("gender") || "unknown";

      trackAdClick(name, email, gender, section, adId);
    }
  }, [section, adId]);

  if (!ad) return <div className="text-white">광고를 찾을 수 없습니다.</div>;

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <img src={ad.contentImg} alt="광고" className="max-w-[90%] max-h-[90%]" />
    </div>
  );
};

export default AdViewerPage;
