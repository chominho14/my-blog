import Input from "@components/input";
import Layout from "@components/layout";
import { fetchUsers } from "@libs/client/api";
import useMe from "@libs/client/useMe";
import useMutations from "@libs/client/useMutation";
import { User } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

interface EditForm {
  name: string;
  email: string;
  formErrors?: string;
  avatar?: FileList;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

interface UsersResponse {
  ok: boolean;
  user: User;
}

const EditProfile: NextPage = () => {
  const user = useMe();

  const { isLoading, data: userData } = useQuery<UsersResponse>(
    ["users"],
    fetchUsers
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditForm>();

  useEffect(() => {
    if (loading) return;
    if (user?.email) setValue("email", user.email);
    if (user?.name) setValue("name", user.name);
    if (user?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/gW7iMYc8PRF7ooz9ysBNKw/${user?.avatar}/avatar`
      );
  }, [user, setValue]);
  console.log(userData);
  const [editProfile, { data, loading }] =
    useMutations<EditProfileResponse>(`/api/users/me`);

  const onValid = async ({ name, email, avatar }: EditForm) => {
    console.log(avatar);
    if (email === "" && name === "") {
      return setError("formErrors", {
        message: "이름과 이메일 모두 입력해주세요.",
      });
    }
    if (avatar && avatar.length > 0 && userData) {
      // 1. 클라우드플레어에 url 요청
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      // 2. url에 파일 업로드하기
      const form = new FormData();
      form.append("file", avatar[0], userData?.user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      editProfile({
        email,
        name,
        avatarId: id,
      });
    } else {
      editProfile({ email, name });
    }
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  });
  // avatar 미리보기 구현
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]; // 라일 리스트
      // 우리 file Url 가져오기
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Layout seoTitle="EditProfile" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="w-14 h-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name", {
            required: true,
          })}
          label="이름"
          name="name"
          type="text"
          required
        />
        <Input
          register={register("email", {
            required: true,
          })}
          required
          label="이메일 주소"
          name="email"
          type="email"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-300 font-bold block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <button className="mt-2 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none ">
          {loading ? "처리 중..." : "프로필 수정하기"}
        </button>
      </form>
    </Layout>
  );
};

export default EditProfile;
