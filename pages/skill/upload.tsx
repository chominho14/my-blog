import Layout from "@components/layout";
import TextArea from "@components/textarea";
import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4">
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
