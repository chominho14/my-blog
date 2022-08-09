import Layout from "@components/layout";
import { getMonthName } from "@components/skill-item";
import { fetchSkillsDetail } from "@libs/client/api";
import useMutations from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Algorithm, User } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface AlgorithmWithUser extends Algorithm {
  user: User;
}

interface SkillDetailResoponse {
  ok: boolean;
  skill: AlgorithmWithUser;
  isLiked: boolean;
}

const SkillDetail: NextPage = () => {
  const router = useRouter();
  const skillID = router.query.id;

  const { data, isLoading, refetch } = useQuery<SkillDetailResoponse>(
    ["skillDetail", skillID],
    () => fetchSkillsDetail(skillID)
  );

  const [toggleFav] = useMutations(`/api/skills/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    // mutation.mutate(skillID);
    mutate();
    toggleFav({});
    setTimeout(() => {
      refetch();
    }, 100);
  };
  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const toggleSkillLiked = async (skillID: any) => {
    fetch(`/api/skills/${skillID}/fav`).then((res) => res.json());
  };

  // 방법 1
  //   const queryClient = useQueryClient();

  //   const mutation = useMutation(
  //     useMutations(`/api/skills/${router.query.id}/fav`),
  //     {
  //       onMutate: async (skillId) => {
  //         await queryClient.cancelQueries(["skillDetail", skillID]);
  //         const prevData = queryClient.getQueriesData(["skillDetail", skillID]);

  //         queryClient.setQueryData(["skillDetail", skillID], (oldLiked: any) =>
  //           oldLiked.map((liked: any) => {
  //             if (liked.id === skillID) {
  //               return {
  //                 ...liked,
  //                 isLiked: !liked.isLiked,
  //               };
  //             }
  //             return liked;
  //           })
  //         );
  //         return { prevData };
  //       },
  //       onError: (error, skillID, { prevData }) => {
  //         queryClient.setQueryData(["skillDetail", skillID], prevData);
  //       },
  //       onSuccess() {
  //         queryClient.invalidateQueries(["skillDetail", skillID]);
  //       },
  //     }
  //   );

  //   방법 2
  const queryClient = useQueryClient();

  const { mutate } = useMutation<SkillDetailResoponse>(
    useMutations(`/api/skills/${router.query.id}`),

    {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(["skillDetail", skillID]);
        const prevData = queryClient.getQueryData<SkillDetailResoponse>([
          "skillDetail",
          skillID,
        ]);
        queryClient.setQueryData(["skillDetail", skillID], () => ({
          ...data,
          isLiked: !data?.isLiked,
        }));
        return {
          prevData,
        };
      },
      onError: (_error, _data, context) => {
        //   queryClient.setQueryData(["skillDetail"], context?.prevData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["skillDetail", skillID]);
      },
    }
  );

  // 방법 3
  //   const useLikeAdd = () => {
  //     const queryClient = useQueryClient();

  //     return useMutation<SkillDetailResoponse>(
  //       useMutations(`/api/skills/${router.query.id}/fav`),
  //       {
  //         onMutate: async (newTodo: any) => {
  //           await queryClient.cancelQueries(["skillDetail"]);
  //           const prevData = queryClient.getQueryData(["skillDetail"]);
  //           queryClient.setQueryData(["skillDetail"], () => ({
  //             ...data,
  //             isLiked: !data?.isLiked,
  //           }));
  //           return {
  //             prevData,
  //           };
  //         },
  //         onError: (_error, _data, context) => {
  //           //   queryClient.setQueryData(["skillDetail", skillID], context?.prevData);
  //         },
  //         onSettled: () => {
  //           queryClient.invalidateQueries(["skillDetail", skillID]);
  //         },
  //       }
  //     );
  //   };

  const timeYear = data?.skill?.createdAt.slice(0, 4);
  const timeDay = data?.skill?.createdAt.slice(8, 10);
  const timeMonth = getMonthName(Number(data?.skill?.createdAt.slice(5, 7)));

  return (
    <Layout hasNavBar hasTabBar hasFooter>
      <div className="flex flex-col space-y-5 py-10 px-4">
        <div className="flex">
          <h2 className="text-2xl w-full">{data?.skill?.title}</h2>
          <button
            onClick={onFavClick}
            className={cls(
              "transition flex items-center justify-center rounded-md p-3 hover:bg-gray-100 border-2 ",
              data?.isLiked
                ? "text-red-500  hover:text-red-600"
                : "text-gray-400 hover:text-gray-500"
            )}
          >
            {data?.isLiked ? (
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6 "
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <hr />
        <div className="flex flex-col space-x-2">
          <div className="py-3 px-2  text-xs">
            <div className="flex">
              {timeMonth}.{timeDay}.{timeYear}&nbsp;&nbsp;
              {data?.skill?.user?.name}&nbsp;&nbsp;
              <div className="bg-gray-300 w-5 h-5 rounded-full mb-1" />
            </div>
          </div>
          <div className="py-3 text-lg">{data?.skill?.subtitle}</div>
          <p className="text-sm">{data?.skill?.explanation}</p>
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
    </Layout>
  );
};

export default SkillDetail;
