import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import SkillItem from "@components/skill-item";
import useMe from "@libs/client/useMe";
import { fetchPagiSkills, fetchSkills, fetchUsers } from "@libs/client/api";
import { Algorithm, User } from "@prisma/client";
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaginationButton from "@components/pagination-button";

export interface AlgorithmWithCount extends Algorithm {
  user: {
    avatar: string;
  };
  _count: {
    favs: number;
    skillAnswers: number;
  };
}

interface AlgorithmResponse {
  ok: boolean;
  skills: AlgorithmWithCount[];
}

const Skill: NextPage = () => {
  const user = useMe();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // const { isLoading, data: skillData } = useQuery<AlgorithmResponse>(
  //   ["skills"],
  //   fetchSkills
  // );

  const { isLoading, data: skillData } = useQuery<AlgorithmResponse>(
    ["pagiSkills", page, limit],
    () => fetchPagiSkills(page, limit)
  );

  const onPrevBtn = () => {
    router.push(`${router.pathname}?page=${page - 1}&limit=${limit}`);
    setPage((prev) => prev - 1);
  };
  const onNextBtn = () => {
    router.push(`${router.pathname}?page=${page + 1}&limit=${limit}`);
    setPage((prev) => prev + 1);
  };
  return (
    <Layout seoTitle="Algorithm" hasNavBar hasTabBar>
      <div className="flex flex-col space-y-5 overflow-auto">
        <div className="bg-slate-200 py-20 flex justify-center">
          코딩테스트 뿌셔보자!!!
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
              comments={
                skill._count.skillAnswers ? skill._count.skillAnswers : 0
              }
              hearts={skill._count.favs}
              avatar={skill.user.avatar}
            />
          ))}

        <PaginationButton onClick={onPrevBtn} direction="left" page={page}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </PaginationButton>
        <PaginationButton
          onClick={onNextBtn}
          direction="right"
          page={page}
          itemLength={skillData?.skills?.length}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </PaginationButton>

        {
          //@ts-ignore
          user?.email == "chominho14@naver.com" ? (
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
          ) : null
        }
      </div>
    </Layout>
  );
};

export default Skill;
