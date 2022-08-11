import Input from "@components/input";
import Layout from "@components/layout";
import useMe from "@libs/client/useMe";
import useMutations from "@libs/client/useMutation";
import { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditForm {
  name: string;
  email: string;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const user = useMe();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<EditForm>();

  useEffect(() => {
    if (loading) return;
    if (user?.email) setValue("email", user.email);
    if (user?.name) setValue("name", user.name);
  }, [user, setValue]);

  const [editProfile, { data, loading }] =
    useMutations<EditProfileResponse>(`/api/users/me`);

  const onValid = ({ name, email }: EditForm) => {
    if (email === "" && name === "") {
      return setError("formErrors", {
        message: "이름과 이메일 모두 입력해주세요.",
      });
    }
    editProfile({ email, name });
  };

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  });

  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
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
