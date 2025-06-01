const AdViewer = ({ id, contentImg, section }) => {
  const handleClick = () => {
    const url = `/ad-view/${section}/${id}`;
    const popupOptions =
      "width=360,height=640,top=100,left=100,scrollbars=no,resizable=no";
    window.open(url, "_blank", popupOptions);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-full bg-black overflow-hidden cursor-pointer"
    >
      {/* 광고 이미지 꽉 차게 */}
      <img src={contentImg} className="w-full h-full object-cover" alt="ad" />

      {/* Sponsored 배지 */}
      <div className="absolute bottom-[1.2vw] right-[1.2vw] text-white text-[0.8vw] bg-white/10 px-[1vw] py-[0.4vw] rounded">
        Sponsored
      </div>
    </div>
  );
};

export default AdViewer;
