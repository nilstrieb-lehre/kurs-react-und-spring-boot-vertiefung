const headers = {
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsIm5iZiI6MTY4NjMwMDY0NCwicm9sZXMiOiJBRE1JTiBTVEFGRl9NRU1CRVIiLCJleHAiOjE2ODYzODcwNDQsInVzZXJJZCI6IjEiLCJ1c2VybmFtZSI6InVzZXIxIn0.lpsDCvM42Txbc_LwntWwuucirAIk_824VFavMp7Wq3yJESoVwQo_NsT1kn8JD-beh34F3EBi2oDD5OVjpwEU2RZH8qvy8_o43K7eFuGjvWNq3DuhpxfY3hqi0F7yKoQHtCFz3uoPg8DCHJu2MC7su5rO_Jh3eLe_wacWiQDn9BJwDfbNkzWkZwmeG4lUPAU0o3BdHF_JvY3ak3YONlELTGN8cYR-G2CkfuoBt1hbKWOkbm33Ra2XsXnidNJ3yuCQXzhh-6P_gCoqhHhgIk7fZUXhI3GX6DE1nGuMBjKeDGHeARuP833qMrcY_Uc4eGliIA2VMXcuwTgWV6akXyWz5A",
};

export async function getBusinessTrips() {
  const response = await fetch("http://localhost:8080/v1/trips", {
    headers,
  });
  if (response.ok) return response.json();
  throw response;
}
export async function getWishlistItems() {
  // fetch carts from api
  const response = await fetch("http://localhost:8080/v1/trips", {
    headers,
  });
  if (response.ok) return response.json();
  throw response;
}

export type Trip = {
  id: number;
  title: string;
  description: string;
  startTrip: [number, number, number, number, number];
  endTrip: [number, number, number, number, number];
  meetings: Array<{
    id: number;
    title: string;
    description: string;
  }>;
};
