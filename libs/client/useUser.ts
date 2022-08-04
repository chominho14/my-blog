import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      console.log("로그인하지 않은 유저");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}

// interface ProfileResponse {
//   ok: boolean;
//   profile: User;
// }

// export default function useUser() {
//   const { data, error } = useSWR<ProfileResponse>("/api/users/me");

//   return { user: data?.profile, isLoading: !data && !error, isError: error };
// }
