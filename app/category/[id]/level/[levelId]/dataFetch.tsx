"use server";
export default async function fetchData(id: string, levelId: string) {
  const res = await fetch(
    `https://api.fnvr.ir/api/v1/words/word?category=${id}&level=${levelId}`,
    {
      next: { tags: ['collection'] },
      method: "GET",
      mode: "cors",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
