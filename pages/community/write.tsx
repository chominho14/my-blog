import type { NextPage } from "next";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout canGoBack>
      <form className="px-4 py-10 pb">
        <TextArea required placeholder="질문을 입력해 주세요!" />
        <button className="mt-2 w-full bg-red-400 hover:bg-red-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:outline-none ">
          작성하기
        </button>
      </form>
    </Layout>
  );
};

export default Write;
