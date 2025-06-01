const StoryFooter = ({ username }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full px-3 py-2 bg-gradient-to-t from-black via-transparent to-transparent flex justify-between items-center gap-2">
      {/* 답장 입력창 */}
      <input
        className="flex-1 px-3 py-2 text-sm rounded-full bg-white bg-opacity-20 text-white placeholder:text-white placeholder:opacity-70 outline-none"
        placeholder={`${username} 답장하기...`}
      />

      {/* 아이콘들 */}
      <div className="flex gap-2 items-center shrink-0">
        {/* 하트 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 6.404a5.753 5.753 0 00-8.136 0L12 7.996l-1.616-1.592a5.753 5.753 0 10-8.136 8.136l1.616 1.592L12 21.75l7.136-7.114 1.616-1.592a5.753 5.753 0 000-8.136z"
          />
        </svg>

        {/* 공유 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11.123l16.684-7.445a.75.75 0 011.006.997l-3.95 11.814a.75.75 0 01-1.18.333l-3.144-2.575-3.036 2.638a.75.75 0 01-1.24-.646l.398-4.27-5.538-1.846a.75.75 0 01-.002-1.048z"
          />
        </svg>
      </div>
    </div>
  );
};

export default StoryFooter;
