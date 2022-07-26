import Link from "next/link";

export default function Enter() {
  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">회원가입</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-gray-500 font-medium pb-5">
            조민호의 기술블로그 함께하기
          </h5>
        </div>
        <form className="flex flex-col mt-8">
          <label className="text-sm font-medium text-gray-700">이름</label>
          <input
            type="email"
            className="mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
            required
          />

          <label className="mt-4 text-sm font-medium text-gray-700">
            이메일 주소
          </label>
          <input
            type="password"
            className="mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
            required
          />

          <label className="mt-4 text-sm font-medium text-gray-700">
            비밀번호 (영문,숫자 조합 6자리 이상)
          </label>
          <input
            type="password"
            className="mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
            required
          />
          {/* {영문 숫자 5자리 이상 정규식
            /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$]/;
            } */}
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none mt-6">
            회원가입
          </button>
        </form>
        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center">
              <span className=" bg-white px-2 text-sm text-gray-500">또는</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              카카오로 시작하기
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-300">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              깃허브로 시작하기
            </button>
          </div>
          <div className="relative -bottom-5 text-center">
            <span className=" bg-white px-1 text-sm text-gray-500">
              이미 계정이 있으신가요?
            </span>
            <Link href="/login">
              <a className=" bg-white px-2 text-m text-black underline underline-offset-1 hover:text-red-500">
                로그인
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
