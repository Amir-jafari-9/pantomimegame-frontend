"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fetchCatgeoryData from "@/app/create-game/[gameId]/groups/category/[id]/categoryDataFetch";

const Page = ({
  params: { id, gameId },
}: {
  params: { id: string; gameId: string };
}) => {
  const [data, setData] = useState<Data | null>(null);
  const [show, setShow] = useState(true);

  interface Data {
    category: string;
    level: string;
    word: string;
    name: string;
  }
  const levels = [
    { no: "1", title: "easy", icon: "/assets/level-easy.svg" },
    { no: "2", title: "medium", icon: "/assets/level-medium.svg" },
    { no: "3", title: "hard", icon: "/assets/level-hard.svg" },
  ];

  useEffect(() => {
    const fetchDataAsync = async () => {
      const dataGet = await fetchCatgeoryData(id);
      setData(dataGet);
    };

    fetchDataAsync();
  }, [id]);

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      {/* {show && ( */}
      <div className="fixed inset-0 z-50 bg-black/80">
        <div className="bg-[url('/assets/modalBg.svg')] bg-center bg-no-repeat flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50  max-w-lg translate-x-[-50%] translate-y-[-50%]  sm:rounded-lg w-full h-full">
          <section className=" flex flex-col items-center justify-center text-center w-full">
            <div className="flex flex-col">
              <button
                className=" hover:scale-105 transition-transform active:translate-y-1 self-start justify-self-start -mt-8 -mr-6"
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
              <h1 className=" bg-[url('/assets/categoryBg.svg')] bg-center bg-contain h-14 bg-no-repeat flex flex-col items-center justify-center text-center text-white text-lg font-semibold mb-7">
                {data?.name}
              </h1>
              {levels.map((level, index) => (
                <button
                  key={index}
                  onClick={() => {
                    router.push(`${pathname}/level/${level.no}`);
                    setShow(false);
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
          </section>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Page;

// : (
//   <div className="text-white bg-[#031A30] h-full w-full fixed top-0 z-50 flex flex-col justify-center items-center gap-8">
//     <p className="text-7xl font-bold tracking-wider">503</p>
//     <Image
//       alt="503 image"
//       src="/assets/503-error.svg"
//       width={100}
//       height={100}
//       className="w-full px-10 lg:w-56 lg:px-0"
//     />
//     <div>
//       <p className="text-center">آخ! سرورمون قطع شده</p>
//       <p className="text-center">لطفا بعدا دوباره تلاش کن.</p>
//     </div>
//     <Link href="/">
//       <Image
//         alt="503 image"
//         src="/assets/goBack.svg"
//         width={100}
//         height={100}
//       />
//     </Link>
//   </div>
