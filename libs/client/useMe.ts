import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useMe() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
