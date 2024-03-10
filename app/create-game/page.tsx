"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Group {
  title: string;
}

const randomNames = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
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

    groupNames.push({ title: name });
  }

  return groupNames;
};

const Page = () => {
  const [groupCount, setGroupCount] = useState(2);
  const [roundCount, setRoundCount] = useState(3);
  const [groups, setGroups] = useState<Group[]>(generateGroupNames(groupCount));
  const [gameTitle, setGameTitle] = useState("");

  const handleGroupCountChange = (newCount: number) => {
    setGroupCount(newCount);
    setGroups(generateGroupNames(newCount));
  };

  useEffect(() => {
    console.log(groups); // Log the groups state whenever it changes
  }, [groups]);

  return (
    <main className="h-screen flex flex-col justify-center items-center text-white">
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
              <input
                value={gameTitle} // Bind the input value to the state
                onChange={(event) => {
                  // Get the value entered by the user
                  let inputValue = event.target.value;

                  // Limit the input value to 20 characters
                  if (inputValue.length > 20) {
                    inputValue = inputValue.slice(0, 20); // Truncate the value to 20 characters
                  }

                  // Update the state with the limited input value
                  setGameTitle(inputValue);
                }}
                placeholder="مسابقه شماره یک"
                className="rounded-full bg-gray-400 placeholder:text-gray-600 placeholder:font-semibold py-2.5 placeholder:text-center text-center text-black"
              />
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

            <button className="flex justify-center" id="go">
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
