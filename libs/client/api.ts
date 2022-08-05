// react-query fetcher function

export async function fetchUsers() {
  return fetch("/api/users/me").then((response) => response.json());
}

export async function fetchSkills() {
  return fetch("/api/skills").then((response) => response.json());
}
