"use server";
export default async function fetchData(
  id: string,
  levelId: string,
  gameId: string,
  status: string
) {
  const res = await fetch(
    //https://api.fnvr.ir/api/v1/words/word?category=${id}&level=${levelId}

    `http://localhost:8000/api/v1/words/word?category=${id}&level=${levelId}&game=${gameId}&status=${status}`,
    {
      next: { tags: ["collection"] },
      method: "GET",
      mode: "cors",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
