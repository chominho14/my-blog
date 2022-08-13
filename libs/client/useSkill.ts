import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useSkill() {
  const [skill, setSkill] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/skills")
      .then((response) => response.json())
      .then((data) => {
        setSkill(data.profile);
      });
  }, [router]);
  return skill;
}
