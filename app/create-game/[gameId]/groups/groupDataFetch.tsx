"use server";
export default async function fetchGroupData(gameId: string) {
  const res = await fetch(
    `http://localhost:8000/api/v1/games/game?gameId=${gameId}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
