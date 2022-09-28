import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMe from "@libs/client/useMe";
import useMutations from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutations<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community`);
    }
  }, [data, router]);
  return (
    <Layout seoTitle="CommunityUpload" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 py-10 pb">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="질문을 입력해 주세요!"
        />
        <button className="mt-2 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none ">
          {loading ? "처리 중..." : "작성하기"}
        </button>
      </form>
    </Layout>
  );
};

export default Write;
