import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

// const fetcher = (url: string) => {
//   fetch(url).then((response) => response.json());
// };

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");

  return { user: data?.profile, isLoading: !data && !error, isError: error };
}
