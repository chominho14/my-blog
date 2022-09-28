import Layout from "@components/layout";
import useMe from "@libs/client/useMe";
import { fetchUsers } from "@libs/client/api";
import useMutation from "@libs/client/useMutation";
import { User } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface MutationResult {
  ok: boolean;
  error?: string;
}

interface UsersResponse {
  ok: boolean;
  profile: User;
}

const Profile: NextPage = () => {
  const router = useRouter();
  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery<UsersResponse>(["users"], fetchUsers);
  const user = useMe();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const [logout, { loading, error, data }] =
    useMutation<MutationResult>("/api/users/logout");

  const onValid = (data: any) => {
    if (loading) return;
    logout(data);
    // router.reload();
    router.push("/");
  };

  useEffect(() => {
    if (data?.ok) {
      if (loading) return;
    } else if (!data?.ok && data?.error) {
      setError("result", { message: data?.error });
    }
  }, [data, router, loading, setError, user]);
  return (
    <Layout seoTitle="MyProfile" hasNavBar hasTabBar hasFooter>
      {!userData?.ok ? (
        <div className="mt-16 px-4 pb-72">
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
                  로그인
                </a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-10 px-4 pb-80">
          <div className="flex items-center space-x-3">
            {!userData?.profile?.avatar ? (
              <div className="w-16 h-16 bg-slate-500 rounded-full" />
            ) : (
              <Image
                width={48}
                height={48}
                src={`https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/${userData?.profile?.avatar}/avatar
              `}
                className=" w-16 h-16 bg-slate-500 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {userData?.profile?.name}
              </span>
              <Link href="/profile/edit">
                <a className="text-sm text-gray-700">프로필 수정하기 &rarr;</a>
              </Link>
            </div>
          </div>
          <div className="mt-10 flex justify-around">
            <div className="flex w-full flex-col items-center">
              <Link href="/profile/loved">
                <a className="hover:bg-red-500 border-2 transition hover:border-red-600 w-full h-14 text-white bg-red-400 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </a>
              </Link>
              <span className="text-sm mt-2 font-medium text-gray-700">
                관심목록
              </span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex flex-col w-full items-center">
              <form
                onSubmit={handleSubmit(onValid)}
                className="flex flex-col w-full items-center"
              >
                <button className="hover:bg-gray-400 border-2 transition  w-full h-14 text-gray-400 hover:text-white bg-gray-200 rounded-lg flex items-center justify-center">
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </form>
              <span className="text-sm mt-2 font-medium text-gray-700">
                로그아웃
              </span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
