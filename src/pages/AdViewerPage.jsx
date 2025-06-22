import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sections } from "../data/sections";
import { trackAdDetailClick } from "../utils/adTrackers";

import detail_img1 from "../assets/detail_img1.png";
import detail_img2 from "../assets/detail_img2.png";
import detail_img3 from "../assets/detail_img3.png";

import buy from "../assets/buy.jpeg"


const AdViewerPage = () => {
  const { section, adId } = useParams();
  const [ad, setAd] = useState(null);
  const [step, setStep] = useState(1);
  const name = localStorage.getItem("name")

  useEffect(() => {
    const found = sections[section]?.ads.find((ad) => ad.id === adId);
    if (found) {
      setAd(found);
      trackAdDetailClick(name, section, adId);
    }
  }, [section, adId]);

  const handleNext = () => {
    trackAdDetailClick(name, section, adId);
    if (step < 3) setStep(step + 1);
  };

  const handleBuyNow = async () => {
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
    <div className="w-screen h-screen bg-gray-800 flex items-center justify-center">
      <div className="relative w-[90vw] max-w-[420px] aspect-[9/16] bg-gray-800 overflow-hidden rounded-xl">
        
        {/* 이미지 자체: 비율 유지 + 전체 표시 */}
        <img
          src={getCurrentImage()}
          alt={`상세 ${step}`}
          className="absolute inset-0 w-full h-full object-contain z-0"
        />
  
        {/* 버튼: 항상 이미지 하단 중앙에 고정 */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4 z-10">
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full bg-white text-black text-xs font-bold shadow-md flex items-center justify-center hover:scale-105 transition"
            >
              다음 →
            </button>
          ) : (
            <button
              onClick={handleBuyNow}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-semibold text-sm shadow-md hover:scale-105 transition whitespace-nowrap"
            >
              <img src={buy} alt="buy" className="w-5 h-5 object-contain" />
              BUY NOW
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default AdViewerPage;
