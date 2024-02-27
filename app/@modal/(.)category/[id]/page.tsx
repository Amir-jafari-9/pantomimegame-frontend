"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import fetchData from "@/app/category/[id]/level/[levelId]/dataFetch";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [data, setData] = useState<Data | null>(null);

  interface Data {
    category: string;
    level: string;
    word: string;
    name: string;
  }
  useEffect(() => {
    const fetchDataAsync = async () => {
      const dataGet = await fetchData(id, "1");
      setData(dataGet.data);
    };

    fetchDataAsync();
  }, [id]);

  const router = useRouter();
  const pathname = usePathname();

  const levels = [
    { no: "1", title: "easy", icon: "/assets/level-easy.svg" },
    { no: "2", title: "medium", icon: "/assets/level-medium.svg" },
    { no: "3", title: "hard", icon: "/assets/level-hard.svg" },
  ];

  return (
    <div>
      {data && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <div className="bg-[url('/assets/modalBg.svg')] bg-center h-full bg-no-repeat flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50  max-w-lg translate-x-[-50%] translate-y-[-50%] transition-all duration-[5000ms] delay-[5000ms] sm:rounded-lg w-full ">
            <section className="h-full relative flex flex-col items-center justify-center text-center">
              <div className="flex flex-col">
                <h1 className=" bg-[url('/assets/categoryBg.svg')] bg-center bg-contain h-14 bg-no-repeat flex flex-col items-center justify-center text-center text-white text-lg font-semibold mb-7">
                  {data.name}
                </h1>
                {levels.map((level, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push(`${pathname}/level/${level.no}`);
                      setData(null);
                    }}
                    className="hover:scale-105 transition-transform active:translate-y-1"
                  >
                    <Image
                      alt="icon image"
                      src={level.icon}
                      width={100}
                      height={100}
                      className="w-56"
                    />
                  </button>
                ))}
              </div>
              <button
                className="absolute top-40 -right-6 lg:-right-6 hover:scale-105 transition-transform active:translate-y-1"
                onClick={() => {
                  router.back();
                }}
              >
                <Image
                  alt="icon image"
                  src="/assets/closeButton.svg"
                  width={100}
                  height={100}
                  className="w-10"
                />
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
