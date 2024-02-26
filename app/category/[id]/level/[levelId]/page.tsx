import Image from "next/image";
import React from "react";
import { revalidateTag } from "next/cache";

async function fetchData(id: string, levelId: string) {
  const res = await fetch(
    `http://localhost:8000/api/v1/words/word?category=${id}&level=${levelId}`,
    {
      next: { revalidate: 1, tags: ["collection"] },
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
  return (
    <main className=" flex flex-col px-5 justify-between h-screen items-center py-16">
      <section className="flex gap-2 text-white/50">
        <h1> {data.data.category} </h1>
        <div> | </div>
        <p> {data.data.level} امتیازی </p>
      </section>
      <section>
        <div className=" bg-[url('/assets/wordContainer.svg')] bg-contain bg-center bg-no-repeat flex text-center">
          <p className=" text-white text-lg p-40 whitespce">{data.data.word}</p>
        </div>
      </section>
      <section className="flex gap-6">
        <button>
          <Image
            alt="icon image"
            src="/assets/letsGo.svg"
            width={100}
            height={100}
          />
        </button>
        <button>
          <Image
            alt="icon image"
            src="/assets/retry.svg"
            width={100}
            height={100}
            className="w-10 h-10"
          />
        </button>
      </section>
    </main>
  );
}
