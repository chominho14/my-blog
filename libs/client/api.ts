// react-query fetcher function

export async function fetchUsers() {
  return fetch("/api/users/me").then((res) => res.json());
}

export async function fetchSkills() {
  return fetch("/api/skills").then((res) => res.json());
}

export async function fetchSkillsDetail(
  skillId: string | string[] | undefined
) {
  if (skillId) {
    return fetch(`/api/skills/${skillId}`).then((res) => res.json());
  } else {
    //@ts-ignore
    return fetch(null).then((res) => res.json());
  }
}

export async function fetchPostDetail(postId: string | string[] | undefined) {
  if (postId) {
    return fetch(`/api/posts/${postId}`).then((res) => res.json());
  } else {
    //@ts-ignore
    return fetch(null).then((res) => res.json());
  }
}

export async function fetchAllPost() {
  return fetch(`/api/posts`).then((res) => res.json());
}

export async function fetchFavSkills() {
  return fetch(`/api/users/me/favs`).then((res) => res.json());
}

export async function fetchPagiSkills(page: any, limit: any) {
  return fetch(`/api/skills?page=${page}&limit=${limit}`).then((res) =>
    res.json()
  );
}

// export async function fetchSearchPost() {
//   return fetch(`/api/search`).then((res) => res.json());
// }
