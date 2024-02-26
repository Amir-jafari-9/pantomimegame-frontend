"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  return (
    <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div className="modal bg-transparent fixed w-80 rounded-x left-[50%] top-[50%] z-50 grid max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg sm:rounded-lg">
        <div className="flex flex-col p-5">
          <button type="button">
            <Link
              href={`${pathname}/level/1`}
              className="hover:scale-105 transition-transform active:translate-y-1"
            >
              <Image
                alt="icon image"
                src="/assets/level-easy.svg"
                width={100}
                height={100}
                className="w-full"
              />
            </Link>
          </button>
          <button type="button">
            <Link
              href={`${pathname}/level/2`}
              className="hover:scale-105 transition-transform active:translate-y-1"
            >
              <Image
                alt="icon image"
                src="/assets/level-medium.svg"
                width={100}
                height={100}
                className="w-full"
              />
            </Link>
          </button>
          <button type="button">
            <Link
              href={`${pathname}/level/3`}
              className="hover:scale-105 transition-transform active:translate-y-1"
            >
              <Image
                alt="icon image"
                src="/assets/level-hard.svg"
                width={100}
                height={100}
                className="w-full"
              />
            </Link>
          </button>
          <button className="text-white py-3">
            <Link href="/?categoty=to" as="/">
              بستن
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
