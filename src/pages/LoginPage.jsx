import { useState } from "react";
import bgImage from "../assets/login_bg.png";

const LoginPage = ({ onLogin }) => {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) return alert("ID를 입력해주세요.");
    localStorage.setItem("name", id);
    onLogin({ name: id });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="relative w-[90vw] max-w-[360px] aspect-[2/3] rounded-xl overflow-hidden bg-white shadow-xl">
        {/* 배경 이미지 */}
        <img
          src={bgImage}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 하단 입력창 */}
        <div className="absolute bottom-0 w-full px-[5%] pb-[5%] z-10">
          <form onSubmit={handleSubmit} className="flex items-center gap-[1vw]">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full bg-white text-black text-sm outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-[#162a8a] text-white text-sm whitespace-nowrap"
            >
              ENTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
