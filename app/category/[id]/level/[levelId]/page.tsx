"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  score: number;
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
  const [timesUp, setTimesUp] = useState(false);
  const [cheat, setCheat] = useState(0);
  const [quitAsk, setquitAsk] = useState(false);
  const [quit, setquit] = useState(false);
  const [timeScore, setTimeScore] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [redScreen, setRedScreen] = useState(false);
  const [rules, setRules] = useState(false);

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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            // Timer reached 0, show alert
            setTimerActive(false);
            setTimesUp(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    // Calculate timeScore based on remaining time
    const timeRemaining = timer;
    if (timeRemaining <= 0) {
      setTimeScore(0);
    } else if (timeRemaining <= 15) {
      setTimeScore(2);
    } else if (timeRemaining <= 30) {
      setTimeScore(4);
    } else if (timeRemaining <= 45) {
      setTimeScore(6);
    } else if (timeRemaining <= 60) {
      setTimeScore(8);
    } else if (timeRemaining <= 75) {
      setTimeScore(10);
    } else if (timeRemaining <= 90) {
      setTimeScore(12);
    } else if (timeRemaining <= 105) {
      setTimeScore(14);
    } else if (timeRemaining <= 120) {
      setTimeScore(16);
    } else if (timeRemaining <= 135) {
      setTimeScore(20);
    } else if (timeRemaining <= 150) {
      setTimeScore(22);
    } else if (timeRemaining <= 165) {
      setTimeScore(24);
    } else {
      setTimeScore(26);
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

  const eyeClickHandler = () => {
    setShowWord(true);
    startCounter();
  };
  const letsGoClickHandle = () => {
    startTimer();
    setCounterActive(false);
  };

  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/music.mp3");
    audio.loop = true;
    audio.muted = muted;
    audio.play();

    return () => {
      audio.pause();
    };
  }, [muted]);

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <>
      <main className=" container relative flex flex-col px-5 justify-center h-screen items-center  gap-16">
        <section className="absolute top-5 flex justify-between w-full px-6 items-center lg:px-96">
          <button onClick={() => setquitAsk(true)}>
            <Image
              alt="icon image"
              src="/assets/backIcon.svg"
              width={100}
              height={100}
              className="w-full"
            />
          </button>
          <div className="flex gap-4 items-center">
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
                className="w-full"
              />
            </button>
            <button onClick={toggleMute}>
              {muted ? (
                <div>
                  <Image
                    alt="icon image"
                    src="/assets/volume-slash.svg"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    alt="icon image"
                    src="/assets/volume.svg"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </div>
              )}
            </button>
          </div>
          {/* Rest of your component */}
        </section>

        {redScreen && <div className="fixed inset-0 z-50 bg-red-600/40"></div>}

        {timesUp && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <section className=" bg-transparent h-full flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg w-full lg:px-20 gap-2">
              <div>
                <Image
                  alt="icon image"
                  src="/assets/TimesUpModal.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <Link href="/">
                <Image
                  alt="icon image"
                  src="/assets/againButton.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </Link>
            </section>
          </div>
        )}
        {quit && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <section className=" bg-transparent h-full flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg w-full lg:px-20 gap-2">
              <div>
                <Image
                  alt="icon image"
                  src="/assets/noScoreModal.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <Link href="/">
                <Image
                  alt="icon image"
                  src="/assets/againButton.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </Link>
            </section>
          </div>
        )}
        {quitAsk && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <section className=" bg-transparent h-full flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg w-full lg:px-20 gap-2">
              <div className="bg-[url('/assets/quitModal.svg')] bg-center h-max bg-no-repeat w-max py-28 px-40 relative">
                <div className="flex gap-2 bottom-8 left-6 absolute">
                  <button onClick={() => setquitAsk(false)}>
                    <Image
                      alt="icon image"
                      src="/assets/noButton.svg"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setquitAsk(false);
                      setquit(true);
                      setTimerActive(false);
                    }}
                  >
                    <Image
                      alt="icon image"
                      src="/assets/yesButton.svg"
                      width={100}
                      height={100}
                      className="w-full"
                    />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
        {cheat === 3 && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <section className=" bg-transparent h-full flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg w-full lg:px-20 gap-2">
              <div>
                <Image
                  alt="icon image"
                  src="/assets/cheatModal.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <Link href="/">
                <Image
                  alt="icon image"
                  src="/assets/againButton.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </Link>
            </section>
          </div>
        )}

        {rules && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <section className=" flex flex-col  fixed left-[50%] h-max top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] w-max px-5">
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

        {complete && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <section className="bg-[url('/assets/scoreContainer.svg')] bg-center h-full bg-no-repeat flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg w-full lg:px-20 gap-12">
              <div>
                <Image
                  alt="icon image"
                  src="/assets/scoreHeader.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </div>
              <section className="w-full px-20 flex flex-col gap-10">
                <div className="flex justify-between items-center w-full bg-[#15314C] overflow-visible h-4 ">
                  <p className="text-xl text-white text-semibold pr-2">
                    {" "}
                    امتیاز کلمه
                  </p>
                  <div className="pl-2">
                    <div className="bg-[url('/assets/greenContainer.svg')] bg-center h-12 bg-no-repeat w-12 flex justify-center items-center text-white text-semibold text-xl">
                      {data && <p>{data.score}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full bg-[#15314C] overflow-visible h-4 ">
                  <div className="pr-2">
                    <div className="bg-[url('/assets/redContainer.svg')] bg-center h-12 bg-no-repeat w-12 flex justify-center items-center text-white text-semibold text-xl">
                      {clickCount}
                    </div>
                  </div>
                  <p className="text-xl text-white text-semibold pl-2">
                    تعویض کلمه
                  </p>
                </div>
                <div className="flex justify-between items-center w-full bg-[#15314C] overflow-visible h-4 ">
                  <p className="text-xl text-white text-semibold pr-2">
                    زمان اضافه
                  </p>
                  <div className="pl-2">
                    <div className="bg-[url('/assets/greenContainer.svg')] bg-center h-12 bg-no-repeat w-12 flex justify-center items-center text-white text-semibold text-xl">
                      {timeScore - 2}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full bg-[#15314C] overflow-visible h-4 ">
                  <div className="pr-2">
                    <div className="bg-[url('/assets/redContainer.svg')] bg-center h-12 bg-no-repeat w-12 flex justify-center items-center text-white text-semibold text-xl">
                      {cheat}
                    </div>
                  </div>
                  <p className="text-xl text-white text-semibold pl-2"> خطا </p>
                </div>
              </section>
              <div className="bg-[#203547] border-2 border-[#B1B8BF] p-2 rounded-3xl flex justify-between w-[65%] px-5">
                <p className="text-white text-semibold text-lg">
                  امتیاز این دور:
                </p>
                {data && (
                  <p className="text-white text-semibold text-lg">
                    {data.score - cheat - clickCount + (timeScore - 2)}
                  </p>
                )}
              </div>
              <Link href="/">
                <Image
                  alt="icon image"
                  src="/assets/againButton.svg"
                  width={100}
                  height={100}
                  className="w-full"
                />
              </Link>
            </section>
          </div>
        )}
        {data && (
          <>
            <div className="flex flex-col gap-6 justify-center items-center">
              {counterActive ? (
                <section className="flex flex-col justify-center items-center gap-6 text-white/50">
                  <p>زمان مونده تا شروع:</p>
                  {showWord && !showFinishTimer && (
                    <div className="w-full flex justify-center items-center">
                      <p className="text-white text-4xl font-semibold">
                        {counter}
                      </p>
                    </div>
                  )}
                </section>
              ) : (
                <section className="flex gap-2 text-white/50 pt-6">
                  <h1>{data.name}</h1>
                  <div> | </div>
                  <p>{data.score} امتیازی</p>
                </section>
              )}

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
            <section className="flex">
              {showFinishTimer ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => setquitAsk(true)}>
                    <Image
                      alt="icon image"
                      src="/assets/noIcon.svg"
                      width={100}
                      height={100}
                      className="w-14"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setComplete(true);
                      setTimerActive(false);
                    }}
                  >
                    <Image
                      alt="icon image"
                      src="/assets/yesIcon.svg"
                      width={100}
                      height={100}
                      className="w-28"
                    />
                  </button>
                  <button
                    className="relative"
                    onClick={() => {
                      setRedScreen(true);
                      setTimeout(() => {
                        setRedScreen(false);
                      }, 200);
                      // Use the functional form of setCheat to ensure you're working with the most up-to-date value
                      setCheat((prevCheat) => prevCheat + 1);
                      if (cheat + 1 === 3) {
                        setTimerActive(false);
                      }
                    }}
                  >
                    <div className="bg-red-500 p-2 w-max absolute -left-2 py-1 text-yellow-400 text-bold rounded-full text-xs">
                      {cheat} {/* Display the updated value */}{" "}
                    </div>
                    <Image
                      alt="icon image"
                      src="/assets/cheatSign.svg"
                      width={100}
                      height={100}
                      className="w-14"
                    />
                  </button>
                </div>
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
    </>
  );
}
