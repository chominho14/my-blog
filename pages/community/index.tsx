import type { NextPage } from "next";

const Community: NextPage = () => {
  return (
    <div className="flex flex-col space-y-5 py-10">
      <div className="bg-slate-300 py-20 flex justify-center">
        Q & A - 개발자에게 궁금한 것
      </div>
      <div className="px-4 font-bold text-2xl">최신 질문</div>
      <div className="space-y-8">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div key={i} className="flex cursor-pointer flex-col items-start">
            <div className="mt-2 px-4 text-gray-700">
              <span className="text-red-400 font-medium">Q.</span>
              개발자를 선택한 이유가 무엇인가요?
            </div>
            <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
              <span>username</span>
              <span>18시간 전</span>
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 1</span>
              </span>
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span>답변 1</span>
              </span>
            </div>
          </div>
        ))}
        <button className="fixed hover:bg-red-500 transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-red-400 rounded-full p-4 text-white">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Community;
