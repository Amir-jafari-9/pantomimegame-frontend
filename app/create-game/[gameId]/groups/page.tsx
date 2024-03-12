"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import fetchGroupData from "./groupDataFetch";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Group {
  group: string;
  players: any[]; // You can define a type for players if needed
  score: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  allGroup: Group[];
  currentRound: number;
  totalRound: number;
  turn: string;
}

export default function Page({
  params: { gameId },
}: {
  params: { gameId: string };
}) {
  const [rules, setRules] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);

  console.log("game id:", gameId);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const dataGet = await fetchGroupData(gameId);
        console.log("game id:", gameId);
        console.log("fetched data:", dataGet.data);
        setData(dataGet.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error gracefully, e.g., set an error state
      }
    };

    fetchDataAsync();
  }, [gameId]);

  const sortedGroups = data?.allGroup.slice().sort((a, b) => b.score - a.score);
  const highestScoreIndex = sortedGroups?.findIndex(
    (group) => group.score === (sortedGroups[0]?.score ?? 0)
  );
  const secondScoreIndex = sortedGroups?.findIndex(
    (group) => group.score === (sortedGroups[1]?.score ?? 0)
  );
  const thirdScoreIndex = sortedGroups?.findIndex(
    (group) => group.score === (sortedGroups[2]?.score ?? 0)
  );

  return (
    <main className="h-screen flex flex-col justify-center items-center text-white w-full overflow-hidden">
      <section className="bg-[url('/assets/groupContainer.svg')] bg-center h-[628px] w-[376px] bg-no-repeat flex flex-col justify-cente items-center relative pt-24 gap-3 px-10">
        <div className="bg-[url('/assets/ribbon.svg')] bg-center h-[66px] w-[190px] bg-no-repeat flex flex-col justify-center items-center absolute top-0">
          {data?.currentRound &&
          data?.totalRound &&
          data.currentRound > data.totalRound ? (
            <p className="pb-2 font-bold tracking-wider">نتایج</p>
          ) : (
            <p className="pb-2 font-bold tracking-wider">
              دور {data?.currentRound} از {data?.totalRound}
            </p>
          )}
        </div>

        <section
          className="h-96 overflow-y-scroll w-full flex flex-col gap-3 p-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data?.allGroup.map((group, index) => (
            <div
              key={index}
              className={`font-semibold relative rounded-full bg-gray-100 text-gray-800 flex flex-row justify-between px-5 py-2 ${
                group.group === data.turn &&
                data?.currentRound &&
                data?.totalRound &&
                data.currentRound <= data.totalRound
                  ? "border-[3px] border-orange-600 text-orange-600 bg-orange-100"
                  : ""
              }`}
            >
              <p> {group.group} </p>
              <p> {group.score} </p>
              {/* Render cup image only for the group with the highest score */}
              {index === highestScoreIndex && data.currentRound !== 1 && (
                <Image
                  alt="Cup image"
                  src="/assets/first-place.svg" // Update with your cup image path
                  width={32}
                  height={32}
                  className="absolute -top-2 -right-5 w-12 z-50" // Adjust styling as needed
                />
              )}
              {index === secondScoreIndex && data.currentRound !== 1 && (
                <Image
                  alt="Cup image"
                  src="/assets/second-place.svg" // Update with your cup image path
                  width={32}
                  height={32}
                  className="absolute -top-2 -right-5 w-12 z-20" // Adjust styling as needed
                />
              )}
              {index === thirdScoreIndex && data.currentRound !== 1 && (
                <Image
                  alt="Cup image"
                  src="/assets/third-place.svg" // Update with your cup image path
                  width={32}
                  height={32}
                  className="absolute -top-2 -right-5 w-12" // Adjust styling as needed
                />
              )}
            </div>
          ))}
        </section>

        {data?.currentRound &&
        data?.totalRound &&
        data.currentRound > data.totalRound ? (
          <p className="pb-2 font-bold tracking-wider">نتایج</p>
        ) : (
          <div className="flex items-center justify-center gap-8">
            <button onClick={() => router.push(`${pathname}/category`)}>
              <Image
                alt="icon image"
                src="/assets/letsGo.svg"
                width={100}
                height={100}
                className="w-32 h-max "
              />
            </button>
            <button
              onClick={() => {
                setRules(true);
              }}
            >
              <Image
                alt="icon image"
                src="/assets/rulesIcon.svg"
                width={100}
                height={100}
                className="w-10 h-max"
              />
            </button>
          </div>
        )}
      </section>

      {rules && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <section className=" flex flex-col fixed left-[50%] h-max top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] w-max px-5">
            <button
              className="z-50 -mb-24 justify-self-end w-12 mr-6 lg:-mb-32"
              onClick={() => {
                setRules(false);
              }}
            >
              <Image
                alt="icon image"
                src="/assets/closeButton.svg"
                width={100}
                height={100}
                className="w-full"
              />
            </button>
            <Image
              alt="icon image"
              src="/assets/rules.svg"
              width={100}
              height={100}
              className="w-full lg:h-screen lg:py-10"
            />
          </section>
        </div>
      )}
    </main>
  );
}
