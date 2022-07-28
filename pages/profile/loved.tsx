import type { NextPage } from "next";
import Layout from "../../components/layout";
import SkillItem from "../../components/skill-item";

const ProfileLoved: NextPage = () => {
  return (
    <Layout hasNavBar hasTabBar hasFooter>
      <div className="flex flex-col space-y-5">
        <div className="px-4">관심 목록</div>
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
      </div>
    </Layout>
  );
};

export default ProfileLoved;
