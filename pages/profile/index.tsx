import type { NextPage } from "next";

const Profile: NextPage = () => {
  return (
    <div className="py-10 px-4">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 bg-slate-500 rounded-full" />
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Username</span>
          <span className="text-sm text-gray-700">프로필 수정하기 &rarr;</span>
        </div>
      </div>
      <div className="mt-10 flex justify-around">
        <div className="flex w-full flex-col items-center">
          <div className="w-full h-14 text-white bg-red-400 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <span className="text-sm mt-2 font-medium text-gray-700">
            관심목록
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
