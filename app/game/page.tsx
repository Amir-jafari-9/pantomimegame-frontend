import Image from "next/image";
import React from "react";

// async function fetchData() {
//   const res = await fetch(
//     "http://localhost:8000/api/v1/words/word?category=tc&level=3",
//     {
//       method: "GET",
//     }
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default async function Page() {
  // const data = await fetchData();
  // console.log(data);
  return (
    <main className=" flex flex-col px-5 justify-between h-screen items-center py-16">
      <section className="flex gap-2 text-white/50">
        <h1> احساسات </h1>
        <div> | </div>
        <p> ۵ امتیازی </p>
      </section>
      <section>
        <div className="relative">
          <Image
            alt="icon image"
            src="/assets/wordContainer.svg"
            width={100}
            height={100}
            className="h-full w-full"
          />
          <p className="absolute text-white top-[40%] left-[47%] text-lg w-max h-max">کلمه</p>
        </div>
      </section>
      <section className="flex gap-6">
        <button>
          <Image
            alt="icon image"
            src="/assets/letsGo.svg"
            width={100}
            height={100}
            className=""
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
