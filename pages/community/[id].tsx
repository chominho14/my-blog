import CommunityAnswers from "@components/community-answer";
import Layout from "@components/layout";
import { fetchPostDetail } from "@libs/client/api";
import useMutations from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import { Answer, Post, User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wondering: number;
  };
  answers: AnswerWithUser[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  response: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const postId = router.query.id;

  const { register, handleSubmit, reset } = useForm<AnswerForm>();

  const { data, isLoading, refetch } = useQuery<CommunityPostResponse>(
    ["postDetail", postId],
    () => fetchPostDetail(postId)
  );
  // 궁금해요 Post 요청을 보내기 위한 useMutations
  const [wonder, { loading }] = useMutations(`/api/posts/${postId}/wonder`);
  // qustions에 answer을 보내기 위한 mutations
  const [sendAnswer, { data: answerData, loading: answerLoading }] =
    useMutations<AnswerResponse>(`/api/posts/${postId}/answers`);

  const onWonderClick = () => {
    if (!data) return;
    mutate();
    if (!loading) {
      wonder({});
    }

    setTimeout(() => {
      refetch();
    }, 100);
  };

  useEffect(() => {
    refetch();
  }, [data]);

  // 궁금해요 Optimistic UI 구현
  const queryClient = useQueryClient();
  const { mutate } = useMutation<CommunityPostResponse>(
    useMutations(`/api/posts/${router.query.id}`),

    {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(["postDetail", postId]);
        const prevData = queryClient.getQueryData<CommunityPostResponse>([
          "postDetail",
          postId,
        ]);
        queryClient.setQueryData(["postDetail", postId], () => ({
          ...data,
          post: {
            ...data?.post,
            _count: {
              ...data?.post._count,
              wondering: data?.isWondering
                ? data?.post?._count.wondering - 1
                : data?.post?._count.wondering + 1,
            },
          },
          isWondering: !data?.isWondering,
        }));
        return {
          prevData,
        };
      },
      onError: (_error, _data, context) => {
        //   queryClient.setQueryData(["skillDetail"], context?.prevData);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["postDetail", postId]);
      },
    }
  );

  // 댓글에 대한 onValid
  const onValid = (form: AnswerForm) => {
    if (answerLoading) return;
    sendAnswer(form);
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset]);

  return (
    <Layout hasTabBar hasNavBar hasFooter>
      <div className="py-4 pb-20">
        <div className="flex mb-3 px-4 pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user?.name}
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-red-400 font-medium">Q.</span>{" "}
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={onWonderClick}
              className={cls(
                "flex space-x-2 items-center text-sm",
                data?.isWondering ? "text-teal-600" : ""
              )}
            >
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
              <span>궁금해요 {data?.post?._count?.wondering}</span>
            </button>
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
              <span>답변 {data?.post?._count?.answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {data?.post.answers.map((answer) => (
            <CommunityAnswers
              key={answer.id}
              name={answer.user.name}
              time={answer.createdAt + ""}
              answer={answer.answer}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <textarea
            {...register("answer", { required: true, minLength: 5 })}
            className="mt-1 shadow-sm w-full focus:ring-red-500 rounded-md border-gray-300 focus:border-red-500 hover:border-red-300"
            rows={4}
            placeholder="질문을 작성해 주세요!"
          />
          <button className="mt-3 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none ">
            {answerLoading ? "처리 중..." : "업로드"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
