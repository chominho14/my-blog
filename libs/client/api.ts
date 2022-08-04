// react-query fetcher function

export async function fetchUsers() {
  return await fetch("/api/users/me").then((response) => response.json());
}

export async function fetchSkills() {
  return await fetch("/api/skills").then((response) => response.json());
}
