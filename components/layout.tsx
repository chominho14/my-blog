import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { cls } from "../libs/client/utils";

interface LayoutProps {
  canGoBack?: boolean;
  hasTabBar?: boolean;
  hasNavBar?: boolean;
  hasFooter?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  canGoBack,
  hasNavBar,
  hasTabBar,
  children,
  hasFooter,
}: LayoutProps) {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div>
      {hasNavBar ? (
        <div className="bg-whilte w-full text-lg font-medium py-3 text-gray-700 border-b top-0 flex items-center justify-between px-6">
          <Link href="/">
            <a className="font-bold text-xl">SkillBlog</a>
          </Link>
          <button className="border-2 px-2 py-1 rounded-lg border-gray-300 transition hover:bg-gray-400 ">
            로그인
          </button>
        </div>
      ) : null}
      {canGoBack ? (
        <div className="bg-whilte w-full text-lg font-medium py-3 text-gray-700 border-b top-0 flex items-center justify-between px-6">
          <button onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      ) : null}
      <hr className="mb-2" />
      <div className={cls("pt-1", hasTabBar ? "" : "")}>{children}</div>
      {hasFooter ? (
        <footer className="pt-5 pb-20 bg-gray-200 w-full text-sm text-gray-400 items-center justify-center flex">
          © 2022 Chominho.
        </footer>
      ) : null}
      {hasTabBar ? (
        <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-2 pt-2 flex justify-between text-xs">
          <Link href="/">
            <a className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>홈</span>
            </a>
          </Link>
          <Link href="/skill">
            <a className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>알고리즘</span>
            </a>
          </Link>
          <Link href="/community">
            <a className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <span>Q&A</span>
            </a>
          </Link>
          <Link href="/profile">
            <a className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>나의 프로필</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
