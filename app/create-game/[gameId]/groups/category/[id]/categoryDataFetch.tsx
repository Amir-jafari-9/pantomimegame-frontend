"use server";
export default async function fetchCatgeoryData(id: string) {
  const res = await fetch(
    //https://api.fnvr.ir/api/v1/words/word?category=${id}&level=${levelId}
    ///categories/category?categoryId=ta

    `http://localhost:8000/api/v1/categories/category?categoryId=${id}`,
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
