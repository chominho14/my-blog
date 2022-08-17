import Layout from "@components/layout";
import { getMonthName } from "@components/skill-item";
import { fetchSkillsDetail } from "@libs/client/api";
import useMutations from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Algorithm, SkillAnswer, User } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import SkillComment from "@components/skillcomment";
import { timeForToday } from "@components/community-answer";
import Image from "next/image";

interface SkillAnswerWithUser extends SkillAnswer {
  user: User;
}

interface AlgorithmWithUser extends Algorithm {
  user: User;
  _count: {
    skillAnswers: number;
    like: number;
  };
  skillAnswers: SkillAnswerWithUser[];
}

interface SkillDetailResoponse {
  ok: boolean;
  skill: AlgorithmWithUser;
  isLiked: boolean;
}

interface SkillAnswerForm {
  skillAnswer: string;
}

interface SkillAnswerResponse {
  ok: boolean;
  response: SkillAnswer;
}

const SkillDetail: NextPage = () => {
  const router = useRouter();
  const skillID = router.query.id;

  const { register, handleSubmit, reset } = useForm<SkillAnswerForm>();

  const { data, isLoading, refetch } = useQuery<SkillDetailResoponse>(
    ["skillDetail", skillID],
    () => fetchSkillsDetail(skillID)
  );

  const [toggleFav, { loading }] = useMutations(
    `/api/skills/${router.query.id}/fav`
  );
  const [
    sendSkillAnswer,
    { data: skillAnswerData, loading: skillAnswerLoading },
  ] = useMutations<SkillAnswerResponse>(`/api/skills/${skillID}/skillanswers`);

  const onFavClick = () => {
    if (!data) return;
    mutate();
    if (!loading) {
      toggleFav({});
    }
    setTimeout(() => {
      refetch();
    }, 100);
  };
  useEffect(() => {
    refetch();
  }, [data]);

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

  // 댓글에 대한 onValid
  const onValid = (form: SkillAnswerForm) => {
    if (skillAnswerLoading) return;
    sendSkillAnswer(form);
  };

  useEffect(() => {
    if (skillAnswerData && skillAnswerData.ok) {
      reset();
      mutate();
    }
  }, [skillAnswerData, reset]);
  //@ts-ignore
  const timeYear = data?.skill?.createdAt.slice(0, 4);
  //@ts-ignore
  const timeDay = data?.skill?.createdAt.slice(8, 10);
  //@ts-ignore
  const timeMonth = getMonthName(Number(data?.skill?.createdAt.slice(5, 7)));

  return (
    <Layout seoTitle="AlgorithmDetail" hasNavBar hasTabBar hasFooter>
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
              {data?.skill.user ? (
                <Image
                  width={23}
                  height={23}
                  src={`https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/${data?.skill.user.avatar}/avatar`}
                  className="bg-gray-300 w-5 h-5 rounded-full mb-1"
                />
              ) : (
                <div className="bg-gray-300 w-6 h-6 rounded-full mb-1" />
              )}
            </div>
          </div>
          {data?.skill?.image != "xx" ? (
            <div className="relative pb-80">
              <Image
                src={`https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/${data?.skill?.image}/public`}
                className=" bg-slate-300 object-cover"
                layout="fill"
              />
            </div>
          ) : (
            <div />
          )}
          <div className="py-3 text-lg">{data?.skill?.subtitle}</div>
          <p className="text-sm">{data?.skill?.explanation}</p>
        </div>
        <div className="py-4">
          <div className="py-3 text-sm font-bold">
            댓글{" "}
            {data?.skill?._count?.skillAnswers
              ? data?.skill?._count?.skillAnswers
              : 0}
            개
          </div>
          <hr />
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex space-x-2 pt-5"
          >
            <div className="w-10 h-10 "></div>
            <input
              {...register("skillAnswer", { required: true })}
              className="appearance-none w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 hover:border-red-300"
              type="text"
            />
            <button className="w-10 hover:bg-red-500 transition-colors cursor-pointer shadow-xl bg-red-400 rounded-sm text-white text-sm">
              {skillAnswerLoading ? "처리 중..." : "게시"}
            </button>
          </form>
        </div>
        <hr />
        <div>
          {data?.skill.skillAnswers.map((skillAnswer) => (
            <SkillComment
              key={skillAnswer.id}
              name={skillAnswer.user.name}
              time={timeForToday(skillAnswer.createdAt)}
              comment={skillAnswer.skillAnswer}
              avatarUrl={skillAnswer.user.avatar + ""}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SkillDetail;
