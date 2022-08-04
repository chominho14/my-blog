import Layout from "@components/layout";
import TextArea from "@components/textarea";
import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-6">
        <div>
          <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-400">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              //   {...register("photo")}
              className="hidden"
              type="file"
              accept="image/*"
            />
          </label>
        </div>
        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            제목
          </label>
          <div>
            <input
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 hover:border-red-300"
              type="text"
              placeholder="제목을 입력해주세요."
            />
          </div>
        </div>
        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            부제목
          </label>
          <div>
            <input
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 hover:border-red-300"
              type="text"
              placeholder="부제목을 입력해주세요."
            />
          </div>
        </div>
        <div className="my-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            기술 설명
          </label>
          <div>
            <TextArea required placeholder="코드 설명을 입력해주세요." />
          </div>
        </div>
        <button className="mt-3 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none ">
          업로드
        </button>
      </div>
    </Layout>
  );
};

export default Upload;
