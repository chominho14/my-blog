import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import SkillItem from "@components/skill-item";
import type { NextPage } from "next";
const Skill: NextPage = () => {
  return (
    <Layout hasNavBar hasTabBar hasFooter>
      <div className="flex flex-col space-y-5">
        <div className="bg-slate-300 py-20 flex justify-center">
          개발자가 되기 위한 노력 (사진)
        </div>
        <div className="px-4">전체 항목</div>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <SkillItem
            id={i}
            key={i}
            time="July.07.22"
            title="제목"
            subtitle="부제목"
            comments={1}
            hearts={1}
          />
        ))}
        <FloatingButton href="/skill/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Skill;
