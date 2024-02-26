"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import fetchData from "./dataFetch";
import Link from "next/link";

interface Data {
  category: string;
  level: string;
  word: string;
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
    setTimer(100); // Set initial timer value in seconds
  }, []);

  const stopTimer = useCallback(() => {
    setTimerActive(false);
  }, []);

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

  return (
    <main className="flex flex-col px-5 justify-between h-screen items-center py-16">
      {data && (
        <>
          <div className="flex flex-col gap-3 justify-center items-center">
            <section className="flex gap-2 text-white/50">
              <h1>{data.category}</h1>
              <div> | </div>
              <p>{data.level} امتیازی</p>
            </section>
            <section className=" text-white/50">
              {timerActive && <p>زمان باقی‌مانده: {timer} ثانیه</p>}
              {showAssets && timer === 0 && <p>پایان</p>}
            </section>
          </div>
          <section>
            <div className="bg-[url('/assets/wordContainer.svg')] bg-contain bg-center bg-no-repeat flex text-center">
              <p className="text-white text-lg p-40 whitespace">{data.word}</p>
            </div>
          </section>
          <section className="flex gap-6">
            {showAssets ? (
              <Link href="/">
                <Image
                  alt="icon image"
                  src="/assets/finishButton.svg"
                  width={100}
                  height={100}
                />
              </Link>
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
