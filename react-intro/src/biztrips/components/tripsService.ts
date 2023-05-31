export async function getBusinessTrips() {
  const response = await fetch("http://localhost:8080/v1/trips");
  if (response.ok) return response.json();
  throw response;
}
export async function getWishlistItems() {
  // fetch carts from api
  const response = await fetch("http://localhost:8080/v1/trips");
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
