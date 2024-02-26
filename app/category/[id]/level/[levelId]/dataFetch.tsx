import Image from "next/image";
import React from "react";
async function fetchData(id: string, levelId: string) {
  const res = await fetch(
    `http://localhost:8000/api/v1/words/word?category=${id}&level=${levelId}`,
    {
      next: { revalidate: 1000 },
      method: "GET",
      mode: "cors",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({
  params: { id, levelId },
}: {
  params: { id: string; levelId: string };
}) {
  const data = await fetchData(id, levelId);
  console.log(data);
  return data;
}
