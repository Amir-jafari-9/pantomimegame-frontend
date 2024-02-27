"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import fetchData from "./dataFetch";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../../../public/assets/animationData.json"; // Import your JSON file
import { count } from "console";

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
  const [counter, setCounter] = useState(0);
  const [counterActive, setCounterActive] = useState(false);
  const [showFinishTimer, setFinishTimer] = useState(false);
  const [showWord, setShowWord] = useState(false);
  const [complete, setComplete] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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

  const handleRetryClick = () => {
    handleRevalidate();
    if (clickCount < 2) {
      setClickCount((prevCount) => prevCount + 1);
    }
  };

  const startTimer = useCallback(() => {
    setFinishTimer(true);
    setTimerActive(true);
    let initialTime = 0;
    if (levelId === "1") {
      initialTime = 50;
    } else if (levelId === "2") {
      initialTime = 80;
    } else if (levelId === "3") {
      initialTime = 110;
    } else if (levelId === "4") {
      initialTime = 180;
    }
    setTimer(initialTime); // Set initial timer value in seconds
  }, [levelId]);

  const startCounter = useCallback(() => {
    setCounterActive(true);
    let initialCount = 20;
    setCounter(initialCount); // Set initial timer value in seconds
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (counterActive) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    if (counter === 1) {
      // Timer reached 0, show alert
      setCounterActive(false);
      setFinishTimer(true);
      startTimer();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [counter, counterActive, startTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    if (timer === 1) {
      // Timer reached 0, show alert
      setTimerActive(false);
      setComplete(true)
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

  const eyeClickHandler = () => {
    setShowWord(true);
    startCounter();
  };
  const letsGoClickHandle = () => {
    startTimer();
  };

  const finishButtonHandle = () => {
    setComplete(true);
    setTimerActive(false);
  };

  return (
    <main className="container relative flex flex-col px-5 justify-center h-screen items-center  gap-16">
      {showWord && !showFinishTimer && (
        <div className="bg-[url('/assets/counterContainer.svg')] bg-center bg-no-repeat p-20 w-full flex justify-center items-center fixed z-50 top-24">
          <p className="text-white text-2xl font-semibold">{counter}</p>
        </div>
      )}

      {complete && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <div className="bg-[url('/assets/isCorrectModal.svg')] bg-center h-full bg-no-repeat flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg w-full">
            <div>
              <Image
                alt="icon image"
                src="/assets/isCorrect.svg"
                width={100}
                height={100}
                className="w-full"
              />
            </div>
            <div className="flex pb-16 pt-6 gap-14">
              <button
                className="hover:scale-105 transition-transform active:translate-y-1"
                onClick={() => router.push("/")}
              >
                <Image
                  alt="icon image"
                  src="/assets/yesIcon.svg"
                  width={100}
                  height={100}
                  className="w-16"
                />
              </button>
              <button
                className="hover:scale-105 transition-transform active:translate-y-1"
                onClick={() => router.push("/")}
              >
                <Image
                  alt="icon image"
                  src="/assets/noIcon.svg"
                  width={100}
                  height={100}
                  className="w-16"
                />
              </button>
            </div>
          </div>
        </div>
      )}
      {data && (
        <>
          <div className="flex flex-col gap-6 justify-center items-center">
            <section className="flex gap-2 text-white/50">
              <h1>{data.name}</h1>
              <div> | </div>
              <p>{data.level} امتیازی</p>
            </section>
            <section className=" text-white/50 flex justify-center items-center">
              {timerActive && showFinishTimer && (
                <div className="flex items-center -ml-10">
                  <p className="text-2xl text-white font-semibold">
                    {" "}
                    {formatTime(timer)}
                  </p>
                  <Lottie
                    animationData={animationData}
                    className="w-16 -px-5"
                  />
                </div>
              )}
              {showFinishTimer && timer === 0 && <p>پایان</p>}
            </section>
          </div>
          <section>
            <div className="bg-[url('/assets/wordContainer.svg')] bg-contain bg-center bg-no-repeat flex text-center">
              <div className="text-white text-lg p-24 whitespace lg:p-32">
                {showWord ? (
                  <p>{data.word}</p>
                ) : (
                  <button onClick={eyeClickHandler}>
                    <Image
                      alt="icon image"
                      src="/assets/eye-slash.svg"
                      width={100}
                      height={100}
                      className="w-10"
                    />
                  </button>
                )}
              </div>
            </div>
          </section>
          <section className="flex gap-6">
            {showFinishTimer ? (
              <button onClick={finishButtonHandle}>
                <Image
                  alt="icon image"
                  src="/assets/finishButton.svg"
                  width={100}
                  height={100}
                />
              </button>
            ) : (
              <div className={` ${showWord ? "flex gap-5" : "hidden"}`}>
                <button onClick={letsGoClickHandle}>
                  <Image
                    alt="icon image"
                    src="/assets/letsGo.svg"
                    width={100}
                    height={100}
                    className="h-14"
                  />
                </button>
                <button
                  onClick={handleRetryClick}
                  disabled={clickCount >= 2}
                  className={` ${
                    clickCount >= 2 ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <Image
                    alt="icon image"
                    src="/assets/retry.svg"
                    width={100}
                    height={100}
                    className="w-12 h-12"
                  />
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
