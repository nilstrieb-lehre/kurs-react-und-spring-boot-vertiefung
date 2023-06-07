export type RegisterResponse = {
  token: string;
};

export async function register(
  username: string,
  password: string
): Promise<RegisterResponse> {
  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw Error(await res.text());
  }
  return res.json();
}
