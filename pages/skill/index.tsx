import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import SkillItem from "@components/skill-item";
import useMe from "@libs/client/useMe";
import { fetchSkills, fetchUsers } from "@libs/client/api";
import { Algorithm } from "@prisma/client";
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface AlgorithmResponse {
  ok: boolean;
  skills: Algorithm[];
}

const Skill: NextPage = () => {
  const user = useMe();

  const { isLoading, data: skillData } = useQuery<AlgorithmResponse>(
    ["skills"],
    fetchSkills
  );

  return (
    <Layout hasNavBar hasTabBar>
      <div className="flex flex-col space-y-5">
        <div className="bg-slate-300 py-20 flex justify-center">
          개발자가 되기 위한 노력 (사진)
        </div>
        <div className="px-4">전체 항목</div>
        {skillData?.skills
          ?.slice(0)
          .reverse()
          .map((skill) => (
            <SkillItem
              id={skill.id}
              key={skill.id}
              time={skill.createdAt + ""}
              title={skill.title}
              subtitle={skill.subtitle}
              comments={1}
              hearts={1}
            />
          ))}

        {user?.email == "chominho14@naver.com" ? (
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
        ) : null}
      </div>
    </Layout>
  );
};

export default Skill;
