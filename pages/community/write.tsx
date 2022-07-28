import type { NextPage } from "next";
import Layout from "../../components/layout";

const Write: NextPage = () => {
  return (
    <Layout>
      <form className="px-4 py-10">
        <textarea
          className="mt-1 shadow-sm w-full hover:border-red-400 focus:ring-red-400 rounded-md border-gray-300 focus:border-red-400 "
          rows={4}
          placeholder="질문을 입력해 주세요!"
        />
        <button className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none ">
          작성하기
        </button>
      </form>
    </Layout>
  );
};

export default Write;
