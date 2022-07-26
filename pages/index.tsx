import Layout from "@components/layout";
import { fetchAllPost } from "@libs/client/api";
import useMe from "@libs/client/useMe";
import useUser from "@libs/client/useUser";
import { Post, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";

interface PostWithUser extends Post {
  user: User;
  _count: {
    wondering: number;
    answers: number;
  };
}

interface CommunityResponse {
  ok: boolean;
  posts: PostWithUser[];
}

const Home: NextPage = () => {
  const user = useMe();

  const { data, isLoading } = useQuery<CommunityResponse>(
    ["allPost"],
    fetchAllPost
  );

  return (
    <Layout seoTitle="Home" hasNavBar hasTabBar hasFooter>
      <div className="px-4">
        {/* <div>
          <Link href="/search">
            <a className="hover:bg-slate-300 transition flex justify-start bg-slate-200 w-full px-3 py-2 rounded-md cursor-pointer border-2 hover:border-gray-400">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <div className="text-gray-400">기술블로그에서 검색하기.</div>
              </div>
            </a>
          </Link>
        </div> */}
        {true ? (
          <img
            src={`https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/ce34210a-b238-4a6d-854c-fb8089a9d300/avatar`}
            className="h-20 w-20 bg-slate-200 mt-3  "
          />
        ) : (
          <div className="h-20 w-20 bg-slate-200 mt-3  " />
        )}
        <h1 className="text-black py-4 text-2xl">조민호의 기술블로그</h1>
        <div className="text-xl text-red-400 flex">
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <div className="px-2">About Me</div>
        </div>
        <hr className="my-2" />
        <div className="flex px-4 space-x-2 w-full py-3 ">
          <div className="text-md px-3 w-1/3 ">Introduction</div>
          <ul className="px-2 w-2/3 text-sm">
            <li>안녕하세요! 신입 개발자 조민호입니다.</li>
            <li>
              인하공업전문대학교 컴퓨터 정보학과에 재학 중이며 현재 졸업 예정자
              입니다.
            </li>
            <li>꾸준히 성장하기 위해 1일 1커밋 운동을 하고 있습니다.</li>
            <li>개발에 대한 야생성을 기르고 싶습니다.</li>
          </ul>
        </div>
        <hr className="my-2" />
        <div className="flex px-4 space-x-2 w-full py-3">
          <div className="text-md px-3 w-1/3 ">Contact & Channel</div>
          <ul className="px-2 w-2/3 text-sm">
            <li>Email. chominho14@naver.com</li>
            <li>
              Github.{" "}
              <a href="https://github.com/chominho14" className="text-xs">
                https://github.com/chominho14
              </a>
            </li>
            <li>
              Notion.{" "}
              <a
                href="https://gleaming-garlic-1d6.notion.site/f8ece8cd8d66483a90e910af2a33fcac"
                className="text-xs"
              >
                https://gleaming-garlic-1d6.notion.site/f8ece8cd8d66483a90e910af
                2a33fcac
              </a>
            </li>
          </ul>
        </div>
        <div className="h-1 bg-gray-200 my-4" />
        <div className="text-lg  flex justify-between">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="px-2 text-red-400">Q & A - 궁금한 것</div>
          </div>
          <Link href="/community">
            <a className="hover:text-red-600 transition text-sm flex text-red-400 mt-1 ">
              <div>더보기</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>
        <div className="h-40 py-3 flex whitespace-nowrap overflow-x-scroll scrollbar-hide snap-x">
          {data?.posts
            ?.slice(0)
            .reverse()
            .map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <a className="rounded-lg mx-3 px-3 transition bg-gray-100 border-red-200 snap-normal snap-center border-2 hover:border-red-300 hover:bg-red-100">
                  <div className="w-60 flex flex-col items-center pt-5">
                    <div className="py-3">{post.question}</div>
                    <div className="flex text-xs py-3 space-x-2">
                      <div>
                        궁금해요 &nbsp;
                        {post._count.wondering ? post._count.wondering : 0}
                      </div>
                      &nbsp;
                      <div>
                        답변 &nbsp;
                        {post._count.answers ? post._count.answers : 0}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </div>

        <div className="h-1 bg-gray-200 my-4" />
      </div>
    </Layout>
  );
};

export default Home;
