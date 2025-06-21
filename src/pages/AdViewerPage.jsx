import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sections } from "../data/sections";
import { trackAdDetailClick } from "../utils/adTrackers";

import detail_img1 from "../assets/detail_img1.png";
import detail_img2 from "../assets/detail_img2.png";
import detail_img3 from "../assets/detail_img3.png";

import buy_img from "../assets/buy_img.png";
import next_btn_img from "../assets/next_btn_img.png";


const AdViewerPage = () => {
  const { section, adId } = useParams();
  const [ad, setAd] = useState(null);
  const [step, setStep] = useState(1);
  const name = localStorage.getItem("name")

  useEffect(() => {
    const found = sections[section]?.ads.find((ad) => ad.id === adId);
    if (found) {
      setAd(found);
  
      console.log("📍 상세페이지 진입 - trackAdDetailClick 실행");
      trackAdDetailClick(name, section, adId);
    }
  }, [section, adId]);
  
  const handleNext = () => {
    console.log("➡️ 다음 클릭 - trackAdDetailClick 실행");
    trackAdDetailClick(name, section, adId);
    if (step < 3) setStep(step + 1);
  };
  
  const handleBuyNow = async () => {
    console.log("🛒 사기 클릭 - trackAdDetailClick 실행");
    await trackAdDetailClick(name, section, adId);
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
    <div className="w-screen h-screen bg-black flex items-center justify-center relative">
      <div className="w-full h-full max-w-[50vw] aspect-[9/16]">
        <img
          src={getCurrentImage()}
          alt={`상세 ${step}`}
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        {step < 3 ? (
          <img
            src={next_btn_img}
            alt="Next"
            onClick={handleNext}
            className="w-40 cursor-pointer"
          />
        ) : (
          <img
            src={buy_img}
            alt="Buy Now"
            onClick={handleBuyNow}
            className="w-40 cursor-pointer"
          />
        )}
      </div>
    </div>
  );

};

export default AdViewerPage;
