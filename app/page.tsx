"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  // Function to set show to true

  return (
    <div className="text-white bg-[#031A30] h-full w-full fixed top-0 z-50 flex flex-col justify-center items-center gap-16">
      <h1 className="text-4xl font-bold "> پانتومیم پارتی </h1>
      <Image
        alt="503 image"
        src="/assets/gameImage.svg"
        width={100}
        height={100}
        className="w-full px-10  lg:px-0 sm:w-80"
      />

      <Link href="/create-game">
        <Image
          alt="503 image"
          src="/assets/letsGoGameButton.svg"
          width={100}
          height={100}
          className="w-full"
        />
      </Link>
    </div>
  );
};

export default Page;
