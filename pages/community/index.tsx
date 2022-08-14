import { timeForToday } from "@components/community-answer";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import { fetchAllPost } from "@libs/client/api";
import useMe from "@libs/client/useMe";
import { Post, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Link from "next/link";

import client from "@libs/server/client";

interface PostWithUser extends Post {
  user: User;
  _count: {
    wondering: number;
    answers: number;
  };
}

interface CommunityResponse {
  posts: PostWithUser[];
}

const Community: NextPage<CommunityResponse> = ({ posts }) => {
  return (
    <Layout seoTitle="Community" hasNavBar hasTabBar hasFooter>
      <div className="flex flex-col space-y-5">
        <div className="bg-slate-200 py-20 flex justify-center">
          Q & A - 개발자에게 궁금한 것을 물어봐 주세요!
        </div>
        <div className="px-4 font-bold text-2xl">최신 질문</div>
        <div className="space-y-8">
          {posts
            ?.slice(0)
            .reverse()
            .map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <a className="flex cursor-pointer flex-col items-start">
                  <div className="mt-2 px-4 text-gray-700">
                    <span className="text-red-400 font-medium">Q.</span>
                    {post.question}
                  </div>
                  <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
                    <span>{post.user.name}</span>
                    <span>{timeForToday(post.createdAt)}</span>
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
                      <span>궁금해요 {post._count?.wondering}</span>
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
                      <span>답변 {post._count?.answers}</span>
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          {posts != undefined ? (
            <FloatingButton href="/community/write">
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
            </FloatingButton>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await client.post.findMany({ include: { user: true } });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default Community;

// interface CommunityResponse {
//   ok: boolean;
//   posts: PostWithUser[];
// }

// const Community: NextPage = () => {
//   const user = useMe();
//   const { data, isLoading } = useQuery<CommunityResponse>(
//     ["allPost"],
//     fetchAllPost
//   );
//   return (
//     <Layout seoTitle="Community" hasNavBar hasTabBar hasFooter>
//       <div className="flex flex-col space-y-5">
//         <div className="bg-slate-200 py-20 flex justify-center">
//           Q & A - 개발자에게 궁금한 것을 물어봐 주세요!
//         </div>
//         <div className="px-4 font-bold text-2xl">최신 질문</div>
//         <div className="space-y-8">
//           {data?.posts
//             ?.slice(0)
//             .reverse()
//             .map((post) => (
//               <Link key={post.id} href={`/community/${post.id}`}>
//                 <a className="flex cursor-pointer flex-col items-start">
//                   <div className="mt-2 px-4 text-gray-700">
//                     <span className="text-red-400 font-medium">Q.</span>
//                     {post.question}
//                   </div>
//                   <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
//                     <span>{post.user.name}</span>
//                     <span>{timeForToday(post.createdAt)}</span>
//                   </div>
//                   <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
//                     <span className="flex space-x-2 items-center text-sm">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                         ></path>
//                       </svg>
//                       <span>궁금해요 {post._count.wondering}</span>
//                     </span>
//                     <span className="flex space-x-2 items-center text-sm">
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                         ></path>
//                       </svg>
//                       <span>답변 {post._count.answers}</span>
//                     </span>
//                   </div>
//                 </a>
//               </Link>
//             ))}
//           {user != undefined ? (
//             <FloatingButton href="/community/write">
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                 />
//               </svg>
//             </FloatingButton>
//           ) : null}
//         </div>
//       </div>
//     </Layout>
//   );
// };
