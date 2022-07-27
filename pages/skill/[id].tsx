import type { NextPage } from "next";

const SkillDetail: NextPage = () => {
  return (
    <div className="flex flex-col space-y-5 py-10 px-4">
      <div>제목</div>
      <hr />
      <div className="flex flex-col space-x-2">
        <div className="py-3 px-2  text-xs">Jul.27.2022</div>
        <div className="py-3 text-lg">부제목</div>
        <p className="text-sm">
          안녕하세요. 코드입니다. ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ ~~~ 무엇일까요.
        </p>
      </div>
      <div className="py-4">
        <div className="py-3 text-sm font-bold">댓글 0개</div>
        <hr />
        <div className="flex space-x-2 pt-5">
          <div className="w-10 h-10 bg-slate-200"></div>
          <input
            className="appearance-none w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 hover:border-red-300"
            type="text"
          />
          <button className="w-10 hover:bg-red-500 transition-colors cursor-pointer shadow-xl bg-red-400 rounded-sm text-white text-sm">
            게시
          </button>
        </div>
      </div>
      <hr />
      <div>
        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <div className="flex space-x-2 py-3">
              <div className="w-10 h-10 bg-slate-200"></div>
              <div className="w-9/12 pl-3">
                <div>username</div>
                <div className="text-sm">
                  ~~게 하면 더 쉬운 코드 작성이
                  가능합니다.~~~~~~~~~~~~~~~~~ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                </div>
                <div className=" text-xs text-gray-400">1달</div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDetail;
