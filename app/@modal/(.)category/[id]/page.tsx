"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  const levels = [
    { no: "1", title: "easy", icon: "/assets/level-easy.svg" },
    { no: "2", title: "medium", icon: "/assets/level-medium.svg" },
    { no: "3", title: "hard", icon: "/assets/level-hard.svg" },
  ];

  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div className="modal bg-transparent fixed w-80 rounded-x left-[50%] top-[50%] z-50 grid max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg sm:rounded-lg">
          <div className="flex flex-col p-5">
            {levels.map((level, index) => (
              <Link
                key={index}
                href={`${pathname}/level/${level.no}`}
                className="hover:scale-105 transition-transform active:translate-y-1"
              >
                <Image
                  alt="icon image"
                  src={level.icon}
                  width={100}
                  height={100}
                  className="w-full"
                />
              </Link>
            ))}

            <button
              className="text-white py-4"
              onClick={() => {
                router.back();
              }}
            >
              بستن{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
