import Layout from "@components/layout";
import useMe from "@libs/client/useMe";
import useMutations from "@libs/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface JoinForm {
  name: string;
  email: string;
  password: string;
  result: string;
}

interface MutationResult {
  ok: boolean;
  error?: string;
}

export default function Join() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<JoinForm>({
    mode: "onChange",
  });

  const [join, { loading, data, error }] =
    useMutations<MutationResult>("/api/users/join");

  const onValid = (data: JoinForm) => {
    if (loading) return;
    join({ ...data });
  };
  useEffect(() => {
    if (data?.ok) {
      router.push("/login");
    }
    if (data?.error) {
      setError("result", { message: data?.error });
    }
  }, [data, router, getValues, setError]);

  const user = useMe();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  // use-hook-form 은 error가 field하나에서 한 번에 하나씩 작동하므로 동시 처리가 불가능
  // const specialCharRegExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  // const numberRegExp = /[0-9]/g;
  // const charRegExp = /[a-zA-Z]/;
  console.log(loading, data, error);
  return (
    <Layout seoTitle="Join" hasNavBar hasTabBar hasFooter>
      <div className="mt-16 px-4 pb-32">
        <h3 className="text-3xl font-bold text-center">회원가입</h3>
        <div className="mt-12">
          <div className="flex flex-col items-center">
            <h5 className="text-sm text-gray-500 font-medium pb-5">
              조민호의 기술블로그 함께하기
            </h5>
          </div>
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-8">
            <label className="text-sm font-medium text-gray-700">이름</label>
            <input
              {...register("name", {
                required: "유저이름을 입력해 주세요.",
              })}
              type="text"
              className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
              required
            />
            <span className="text-sm text-gray-400 p-1">
              {errors.name?.message}
            </span>
            <label className="mt-4 text-sm font-medium text-gray-700">
              이메일 주소
            </label>
            <input
              {...register("email", {
                required: "이메일을 입력해 주세요.",
              })}
              type="email"
              className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
              required
            />
            <span className="text-sm text-gray-400 p-1">
              {errors.email?.message}
            </span>
            <label className="mt-4 text-sm font-medium text-gray-700">
              비밀번호 (영문,숫자 조합 6자리 이상)
            </label>
            <input
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                pattern: {
                  message:
                    "비밀번호는 특수문자, 영문, 숫자를 섞어 8자리 이상으로 만들어 주세요.",
                  value:
                    /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                },
              })}
              type="password"
              className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
              required
            />
            <span className="text-sm text-gray-400 p-1">
              {errors.password?.message}
            </span>
            <span className="text-sm text-gray-400 p-1">
              {errors.result?.message}
            </span>
            <button className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none mt-6">
              {loading ? "처리 중..." : "회원가입"}
            </button>
          </form>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute w-full border-t border-gray-300" />
              <div className="relative -top-3 text-center">
                <span className=" bg-white px-2 text-sm text-gray-500">
                  또는
                </span>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:outline-none">
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
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:outline-none">
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
            </div> */}
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
    </Layout>
  );
}
