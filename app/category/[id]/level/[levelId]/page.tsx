"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import fetchData from "./dataFetch";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../../../public/assets/animationData.json"; // Import your JSON file

interface Data {
  category: string;
  level: string;
  word: string;
  name: string;
}

export default function Page({
  params: { id, levelId },
}: {
  params: { id: string; levelId: string };
}) {
  const [data, setData] = useState<Data | null>(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDataAsync = async () => {
      const dataGet = await fetchData(id, levelId);
      setData(dataGet.data);
    };

    fetchDataAsync();
  }, [id, levelId]);

  const handleRevalidate = async () => {
    const dataGet = await fetchData(id, levelId);
    setData(dataGet.data);
  };

  const startTimer = useCallback(() => {
    setShowAssets(true);
    setTimerActive(true);
    let initialTime = 0;
    if (levelId === "1") {
      initialTime = 50;
    } else if (levelId === "2") {
      initialTime = 80;
    } else if (levelId === "3") {
      initialTime = 110;
    } else {
      initialTime = 180;
    }
    setTimer(initialTime); // Set initial timer value in seconds
  }, [levelId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    if (timer === 0) {
      // Timer reached 0, show alert
      setTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, timerActive]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <main className="container flex flex-col px-5 justify-center h-screen items-center  gap-16">
      {data && (
        <>
          <div className="flex flex-col gap-6 justify-center items-center">
            <section className="flex gap-2 text-white/50">
              <h1>{data.name}</h1>
              <div> | </div>
              <p>{data.level} امتیازی</p>
            </section>
            <section className=" text-white/50 flex justify-center items-center">
              {timerActive && (
                <div className="flex items-center -ml-10">
                  <p className="text-2xl text-white font-semibold">
                    {" "}
                    {formatTime(timer)}
                  </p>
                  <Lottie animationData={animationData} className="w-16 -px-5" />
                </div>
              )}
              {showAssets && timer === 0 && <p>پایان</p>}
            </section>
          </div>
          <section>
            <div className="bg-[url('/assets/wordContainer.svg')] bg-contain bg-center bg-no-repeat flex text-center">
              <div className="text-white text-lg p-20 whitespace lg:p-32">
                {showWord ? (
                  <p>{data.word}</p>
                ) : (
                  <button onClick={() => setShowWord(true)}>
                    <Image
                      alt="icon image"
                      src="/assets/eye-slash.svg"
                      width={100}
                      height={100}
                      className="w-12"
                    />
                  </button>
                )}
              </div>
            </div>
          </section>
          <section className="flex gap-6">
            {showAssets ? (
              <button onClick={() => router.push("/")}>
                <Image
                  alt="icon image"
                  src="/assets/finishButton.svg"
                  width={100}
                  height={100}
                />
              </button>
            ) : (
              <>
                <button onClick={startTimer}>
                  <Image
                    alt="icon image"
                    src="/assets/letsGo.svg"
                    width={100}
                    height={100}
                  />
                </button>
                <button onClick={handleRevalidate}>
                  <Image
                    alt="icon image"
                    src="/assets/retry.svg"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                  />
                </button>
              </>
            )}
          </section>
        </>
      )}
    </main>
  );
}
