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
    return fetch(null).then((res) => res.json());
  }
}
