"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import PostData from "./dataPost";
import { usePathname, useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "@/public/assets/animationLoading.json"; // Import your JSON file

interface Group {
  group: string;
}

const randomNames = [
  "رنده کنندگان",
  "همواره خستگان",
  "نمکای جمع",
  "لولو‌ها",
  "آبکش کنندگان",
  "فلفل نبین چه ریزه ها",
  "کشنده‌های بی رحم",
  "جوجوها",
  "گربه‌های بلا",
  "شکلات‌ خورها",
  "پنگوئن‌های پرسرعت",
  "بادبادک‌ بازان",
  "کلاغ‌های کنجکاو",
  "کیک‌خورها",
  "موش‌های ماجراجو",
  "پودرکنندگان",
  "پیکان جوانان",
  "دالتون‌ها",
  "انتقام جویان",
  "انجمن صنفی مادربزرگ",
  "قارچ‌های غیرسمی",
  "عقاب‌های جمع",
  "قورباغه‌های قدرتمند",
  "زنبورهای بولداگ",
  "شیرهای خوش شانس",
  "گریفندور غیور",
  "اسلیترین وحشی",
  "ریونکلاهای دانا",
  "هافلپاف‌های مهربون",
  "خاله ریزه‌ها",
  "گردن درازها",
  "ماهی‌ها",
  "ونگوک‌های معاصر",
  "هکرهای خوفناک",
  "جنگجویان اودین",
  "هلوها",
  "تربچه‌ها",
  "دایناسورای گنگ",
  "کدوهای تنبل",
  "ببعی‌های پشمالو",
  "مارمولک‌‌های مرموز",
  "کوالاهای خوابالو",
  "شلغم‌های محترم",
  "دکترهای جمع",
  "تف کنندگان",
  "گرگ‌های درنده",
  "بچه‌های جمع",
  "عاشقان سیب‌زمینی",
  "پرتقال دان زات دان",
  "بچه شیرینای جمع",
  "فندق‌ها",
  "عسلای جمع",
  "بچه گلای جمع",
  "آذرخش",
  "چای خورها",
  "جویندگان خون",
  "گلابیا",
];

const generateGroupNames = (count: number): Group[] => {
  const groupNames: Group[] = [];
  const usedNames: Set<string> = new Set();

  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * randomNames.length);
    let name = randomNames[randomIndex];

    // Check if name is already used
    while (usedNames.has(name)) {
      randomIndex = Math.floor(Math.random() * randomNames.length);
      name = randomNames[randomIndex];
    }

    // Add name to used names set
    usedNames.add(name);

    groupNames.push({ group: name });
  }

  return groupNames;
};
interface PostDataResponse {
  gameId: string;
}

const Page = () => {
  const [loading, setLoading] = useState(false); // State for loading state
  const [groupCount, setGroupCount] = useState(2);
  const [roundCount, setRoundCount] = useState(3);
  const [groups, setGroups] = useState<Group[]>(generateGroupNames(groupCount));
  const [gameTitle, setGameTitle] = useState("");
  const [data, setData] = useState<PostDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error message
  const [nameConflictError, setNameConflictError] = useState<string | null>(
    null
  ); // State for error message

  const router = useRouter();
  const pathname = usePathname();

  const handleGroupCountChange = (newCount: number) => {
    setGroupCount(newCount);
    setGroups(generateGroupNames(newCount));
  };

  useEffect(() => {
    console.log(groups); // Log the groups state whenever it changes
  }, [groups]);

  const handleGoButtonClick = async () => {
    if (!gameTitle.trim()) {
      // Check if gameTitle is empty or contains only whitespace
      setError("نام مسابقه رو انتخاب کن!");
      return; // Exit early if gameTitle is empty
    }
    const postData = {
      title: gameTitle,
      groups: groups,
      roundsSetting: {
        totalRounds: roundCount,
      },
    };
    console.log(postData);

    try {
      console.log(postData);
      setLoading(true);
      const responseData = await PostData(postData);
      router.push(`${pathname}/${responseData.gameId}/groups`);
      console.log("Response Data:", responseData);

      // Use responseData directly to construct the URL for navigation
    } catch (error) {
      setLoading(false);
      console.error("Failed to send data:", error);
      setNameConflictError("نام تکراریه!");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center text-white my-10">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%]  sm:rounded-lg w-full h-full">
            <Lottie animationData={animationData} className="w-full px-10" />
          </div>
        </div>
      )}
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
      <div className="relative h-max w-max flex justify-center">
        <section className="absolute -top-14">
          <Image
            alt="icon image"
            src="/assets/newGameDoll.svg"
            width={100}
            height={100}
            className="w-56 h-max "
          />
        </section>
        <section className="bg-[url('/assets/newGame.svg')] bg-center h-[577px] w-[334px] bg-no-repeat flex flex-col justify-center items-center relative">
          <section className="flex flex-col gap-6 pt-14">
            <div className="flex flex-col gap-4">
              <p>نام مسابقه:</p>

              <div className="flex flex-col gap-1.5 text-center">
                <input
                  required
                  value={gameTitle}
                  onChange={(event) => {
                    let inputValue = event.target.value;
                    if (inputValue.length > 20) {
                      inputValue = inputValue.slice(0, 20);
                    }
                    setGameTitle(inputValue);
                    setError(null); // Clear error when input changes
                    setNameConflictError(null);
                  }}
                  placeholder="مسابقه شماره یک"
                  className="rounded-full bg-gray-400 placeholder:text-gray-600 placeholder:font-semibold py-2.5 placeholder:text-center text-center text-black"
                />
                {error && <p className="text-red-500 text-xs">{error}</p>}{" "}
                {nameConflictError && (
                  <p className="text-red-500 text-xs">{nameConflictError}</p>
                )}{" "}
                {/* Display error message */}
              </div>
            </div>
            <div className="flex justify-between items-center text-lg">
              <p>تعداد گروه:</p>
              <div className="flex items-center gap-2 font-semibold">
                <button
                  onClick={() => handleGroupCountChange(groupCount + 1)}
                  disabled={groupCount >= 15}
                  className={`${
                    groupCount >= 15 ? "opacity-20 cursor-not-allowed" : ""
                  }`}
                >
                  <Image
                    alt="icon image"
                    src="/assets/addButton.svg"
                    width={100}
                    height={100}
                    className=" w-7 "
                  />
                </button>
                <p className="w-5 flex justify-center">{groupCount}</p>
                <button
                  onClick={() => handleGroupCountChange(groupCount - 1)}
                  disabled={groupCount <= 2}
                  className={`${
                    groupCount <= 2 ? "opacity-20 cursor-not-allowed" : ""
                  }`}
                >
                  <Image
                    alt="icon image"
                    src="/assets/minusButton.svg"
                    width={100}
                    height={100}
                    className=" w-7 "
                  />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-lg">
              <p>تعداد دور:</p>
              <div className="flex items-center gap-2 font-semibold">
                <button
                  onClick={() => setRoundCount((prevCount) => prevCount + 1)}
                  disabled={roundCount >= 20}
                  className={`${
                    roundCount >= 20 ? "opacity-20 cursor-not-allowed" : ""
                  }`}
                >
                  <Image
                    alt="icon image"
                    src="/assets/addButton.svg"
                    width={100}
                    height={100}
                    className=" w-7 "
                  />
                </button>
                <p className="w-5 flex justify-center">{roundCount}</p>
                <button
                  onClick={() => setRoundCount((prevCount) => prevCount - 1)}
                  disabled={roundCount <= 3}
                  className={`${
                    roundCount <= 3 ? "opacity-20 cursor-not-allowed" : ""
                  }`}
                >
                  <Image
                    alt="icon image"
                    src="/assets/minusButton.svg"
                    width={100}
                    height={100}
                    className=" w-7 "
                  />
                </button>
              </div>
            </div>

            <button
              className="flex justify-center"
              id="go"
              onClick={handleGoButtonClick}
            >
              <Image
                alt="icon image"
                src="/assets/letsGo.svg"
                width={100}
                height={100}
                className="w-28 h-max "
              />
            </button>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Page;
