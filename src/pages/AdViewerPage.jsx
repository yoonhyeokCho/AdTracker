import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sections } from "../data/sections";
import { trackAdClick } from "../utils/adTrackers";

import detail_img1 from "../assets/detail_img1.png";
import detail_img2 from "../assets/detail_img2.png";
import detail_img3 from "../assets/detail_img3.png";
import next_btn_img from "../assets/next_btn_img.png";
import buy_img from "../assets/buy_img.png";

const AdViewerPage = () => {
  const { section, adId } = useParams();
  const [ad, setAd] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const found = sections[section]?.ads.find((ad) => ad.id === adId);
    if (found) {
      setAd(found);
      const name = localStorage.getItem("name") || "anonymous";
      trackAdClick(name, section, adId);
    }
  }, [section, adId]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBuyNow = () => {
    // 👇 추후 Airtable 저장 등 기능 추가 예정
    console.log("🛒 Buy Now clicked");
    window.close();
  };

  const getCurrentImage = () => {
    switch (step) {
      case 1:
        return detail_img1;
      case 2:
        return detail_img2;
      case 3:
        return detail_img3;
      default:
        return detail_img1;
    }
  };

  if (!ad) return <div className="text-white">광고를 찾을 수 없습니다.</div>;

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="relative w-[360px] h-[640px] bg-black overflow-hidden">
        {/* ✅ object-contain 으로 변경 */}
        <img
          src={getCurrentImage()}
          alt={`상세 ${step}`}
          className="w-full h-full object-contain"
        />

        {step < 3 ? (
          <img
            src={next_btn_img}
            alt="다음"
            onClick={handleNext}
            className="absolute bottom-4 right-4 w-16 cursor-pointer"
          />
        ) : (
          <img
            src={buy_img}
            alt="Buy Now"
            onClick={handleBuyNow}
            className="absolute bottom-4 right-4 w-20 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default AdViewerPage;
