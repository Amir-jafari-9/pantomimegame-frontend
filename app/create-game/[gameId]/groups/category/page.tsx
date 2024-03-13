"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const categories = [
    {
      id: "TF",
      title: "احساسات",
      icon: "/assets/emotions.png",
    },
    {
      id: "TA",
      title: "حیوان",
      icon: "/assets/animals.png",
    },
    {
      id: "TB",
      title: "کتاب",
      icon: "/assets/books.png",
    },
    {
      id: "TE",
      title: "محیط",
      icon: "/assets/environment.png",
    },
    {
      id: "TCH",
      title: "شخصیت",
      icon: "/assets/figures.png",
    },
    {
      id: "TJ",
      title: "شغل",
      icon: "/assets/jobs.png",
    },
    {
      id: "TO",
      title: "اشیا",
      icon: "/assets/objects.png",
    },
    {
      id: "TT",
      title: "گردشگری",
      icon: "/assets/places.png",
    },
    {
      id: "TS",
      title: "ورزشی",
      icon: "/assets/sports.png",
    },
    {
      id: "TET",
      title: "انتزاعی",
      icon: "/assets/abstract.png",
    },
    {
      id: "TTE",
      title: "تکنولوژی",
      icon: "/assets/technology.png",
    },
    {
      id: "TAC",
      title: "عمومی",
      icon: "/assets/general.png",
    },
    {
      id: "TM",
      title: "موسیقی",
      icon: "/assets/music.png",
    },
    {
      id: "TCC",
      title: "شهر و کشور",
      icon: "/assets/city-country.png",
    },
    {
      id: "TZ",
      title: " ضرب‌المثل ",
      icon: "/assets/proverb.png",
    },
    {
      id: "TK",
      title: " کودکان ",
      icon: "/assets/children.png",
    },
  ];

  const [randomCategoryId, setRandomCategoryId] = useState("");

  // Function to choose a random category ID
  const chooseRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    const randomCategory = categories[randomIndex];
    setRandomCategoryId(randomCategory.id);
  };

  // Function to generate a random number between min (inclusive) and max (inclusive)
  const generateRandomNumber = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Effect to choose a random category ID on component mount
  useEffect(() => {
    chooseRandomCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to generate the link with the random category ID and random level
  const generateRandomLink = () => {
    const randomLevel = generateRandomNumber(1, 3);
    return `${pathname}/${randomCategoryId}/level/${randomLevel}`;
  };

  return (
    <main className="p-4 flex justify-center flex-col items-center gap-12 h-full py-16 relative">
      <div className="absolute top-5 flex justify-between w-full px-6 items-center lg:px-96">
        <button onClick={() => router.back()}>
          <Image
            alt="icon image"
            src="/assets/backIcon.svg"
            width={100}
            height={100}
            className="w-full"
          />
        </button>
      </div>
      <h1>
        <Image
          alt="icon image"
          src="/assets/category.svg"
          width={100}
          height={100}
          className="w-full px-4"
        />
      </h1>
      <section className="flex flex-col gap-4 bg-white/70 rounded-3xl p-4">
        <section className="flex gap-3">
          <Link
            href={generateRandomLink()}
            passHref
            className="bg-gray-50 px-4 shadow-lg py-2.5 rounded-2xl w-full flex justify-center gap-4 items-center hover:scale-105 transition-transform active:translate-y-1"
          >
            <Image
              alt="icon image"
              src="/assets/dice.png"
              width={100}
              height={100}
              className="w-7 h-7"
            />
            <p className="text-sm font-medium lg:text-base"> تصادفی </p>
          </Link>
          <Link
            href={`${pathname}/TG/level/4`}
            className="bg-gray-50 px-4 py-2.5 rounded-2xl  w-full flex justify-center gap-4 items-center shadow-[0_10px_15px_-3px_rgba(243,183,29,0.2),0_4px_6px_-4px_rgba(243,183,29,0.2)] border border-yellow-400 hover:scale-105 transition-transform active:translate-y-1"
          >
            <Image
              alt="icon image"
              src="/assets/golden-cup.png"
              width={100}
              height={100}
              className="w-7 h-7"
            />
            <p className="text-sm font-medium lg:text-base"> طلایی </p>
          </Link>
        </section>
        <section className="grid grid-cols-4 gap-2">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`${pathname}/${category.id}`}
              passHref
              scroll={false}
              className="bg-gray-50 flex flex-col justify-center items-center h-full w-full p-4 gap-3 shadow-lg rounded-2xl  hover:shadow-2xl  hover:scale-105 transition-transform active:translate-y-1"
            >
              <Image
                alt="icon image"
                src={category.icon}
                width={100}
                height={100}
              />
              <p className="text-xs font-medium lg:text-base">
                {category.title}
              </p>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}
