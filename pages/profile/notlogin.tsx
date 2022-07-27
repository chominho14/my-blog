import Link from "next/link";

export default function Notlogin() {
  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">로그인</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-gray-500 font-medium pb-5">
            로그인 하시면
          </h5>
          <h5 className="text-sm text-gray-500 font-medium pb-5">
            [프로필] 을 이용하실 수 있습니다.
          </h5>
          <Link href="/login">
            <a className="flex justify-center w-40 bg-red-500 hover:bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none mt-6">
              회원가입
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
