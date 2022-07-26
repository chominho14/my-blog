// import Layout from "@components/layout";
// import { fetchSearchPost } from "@libs/client/api";
// import useGET from "@libs/client/useGet";
// import useMutations from "@libs/client/useMutation";
// import { Post, User } from "@prisma/client";
// import { useQuery } from "@tanstack/react-query";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// interface SearchpostWithUser extends Post {
//   user: User;
//   _count: {
//     wondering: number;
//     answers: number;
//   };
// }

// interface SearchResponse {
//   ok: boolean;
//   searchPosts: SearchpostWithUser[];
// }

// interface EnterForm {
//   searchText: string;
// }

// function SearchSkill(data: any) {
//   console.log(data);
// }

// export default function Enter() {
//   const router = useRouter();
//   const { register, handleSubmit, reset } = useForm<EnterForm>();

//   const { data, isLoading } = useQuery<SearchResponse>(["searchPost"], () =>
//     fetchSearchPost()
//   );
//   console.log(data);

//   const onValid = (form: EnterForm) => {
//     SearchSkill(form);
//     reset();
//   };

//   return (
//     <Layout hasNavBar hasTabBar hasFooter>
//       <div className="px-4">
//         <form
//           onSubmit={handleSubmit(onValid)}
//           className="flex justify-center space-x-1"
//         >
//           <input
//             // {.?..register("searchText", { required: true })}
//             type="text"
//             className="transition hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-400 focus:border-red-400"
//             required
//             placeholder="조민호 블로그에서 궁금한 것을 검색해보세요."
//           />
//           <button className="transition px-3 bg-red-200 rounded-lg mt-2 hover:bg-red-400 border-2 border-red-300 focus:ring-2 focus:ring-offset-1 focus:ring-red-400 focus:outline-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </button>
//         </form>
//         <div className="py-4 mt-4 px-2">
//           <div>인기 검색어</div>
//           <div className="flex flex-col space-y-5 py-10">
//             <div className="px-4 text-xs text-gray-500">총 4개</div>
//             {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
//               <div
//                 key={i}
//                 className="flex px-4  border-b pb-5 cursor-pointer justify-between"
//               >
//                 <div className="flex space-x-4">
//                   <div className="pt-2 flex flex-col">
//                     <div className="flex space-x-2 text-xs">
//                       <div>jul.27.2022</div>
//                     </div>
//                     <h2 className="text-xl font-bold text-gray-900">제목</h2>
//                     <span className="text-xs text-gray-500">부제목</span>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2 items-end justify-end">
//                   <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                       ></path>
//                     </svg>
//                     <span>1</span>
//                   </div>
//                   <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                       ></path>
//                     </svg>
//                     <span>1</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

export default function Search() {}
