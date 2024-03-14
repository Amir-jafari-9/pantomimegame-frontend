"use server";
export default async function fetchGroupData(gameId: string) {
  console.log("fetch test", gameId);
  const res = await fetch(
    `https://api.fnvr.ir/api/v1/games/game?gameId=${gameId}`,
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
