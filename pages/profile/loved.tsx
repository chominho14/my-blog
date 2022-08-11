import Layout from "@components/layout";
import SkillItem from "@components/skill-item";
import { fetchFavSkills } from "@libs/client/api";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { AlgorithmWithCount } from "pages/skill";

interface AlgorithmResponse {
  ok: boolean;
  favs: AlgorithmWithCount[];
}

const ProfileLoved: NextPage = () => {
  const { isLoading, data } = useQuery<AlgorithmResponse>(
    ["favSkills"],
    fetchFavSkills
  );
  console.log(data);

  return (
    <Layout hasNavBar hasTabBar hasFooter>
      <div className="flex flex-col space-y-5">
        <div className="px-4">관심 목록</div>
        {data?.favs?.map((fav) => (
          <SkillItem
            id={fav.algorithm.id}
            key={fav.algorithm.id}
            time={fav.algorithm.createdAt + ""}
            title={fav.algorithm.title}
            subtitle={fav.algorithm.subtitle}
            comments={fav.algorithm._count.skillAnswers}
            hearts={fav.algorithm._count.favs}
          />
        ))}
      </div>
    </Layout>
  );
};

export default ProfileLoved;
