"use client";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [rules, setRules] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteAsk, setDeleteAsk] = useState(false);

  const groups = [
    {
      id: "1",
      title: "آقای روشنگرا",
      score: "100",
    },
    {
      id: "1",
      title: "آقای روشنگرا",
      score: "200",
    },
    {
      id: "1",
      title: "آقای روشنگرا",
      score: "300",
    },
  ];

  return (
    <main className="h-screen flex flex-col justify-center items-center text-white w-full overflow-hidden">
      <section className="bg-[url('/assets/groupContainer.svg')] bg-center h-[628px] w-[376px] bg-no-repeat flex flex-col justify-cente items-center relative pt-24 gap-3 px-10">
        <div className="bg-[url('/assets/ribbon.svg')] bg-center h-[66px] w-[190px] bg-no-repeat flex flex-col justify-center items-center absolute top-0">
          <p className="pb-2 font-bold"> دور ۳ از ۱۰ </p>
        </div>

        <section
          className="h-96 overflow-y-scroll w-full flex flex-col gap-3 p-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {groups.map((group, index) => (
            <div
              key={index}
              className={`font-semibold rounded-full bg-gray-100 text-gray-800 flex flex-row justify-between px-5 
              py-1.5  ${edit ? " relative" : ""}`}
            >
              {edit && (
                <button className="absolute -top-3 -left-1" onClick={()=>setDeleteAsk(true)}>
                  <Image
                    alt="icon image"
                    src="/assets/close-circle.svg"
                    width={100}
                    height={100}
                    className="w-6 h-max "
                  />
                </button>
              )}
              {edit ? (
                <input
                  className="bg-transparent active:ring-0 active:outline-none"
                  placeholder={group.title}
                />
              ) : (
                <p> {group.title} </p>
              )}
              <p> {group.score} </p>
            </div>
          ))}
        </section>

        <div className="flex items-center justify-center gap-7">
          {edit ? (
            <button onClick={()=>setEdit(false)}>
              <Image
                alt="icon image"
                src="/assets/saveChanges.svg"
                width={100}
                height={100}
                className="w-36 h-max "
              />
            </button>
          ) : (
            <>
              <button onClick={() => setEdit(!edit)}>
                <Image
                  alt="icon image"
                  src="/assets/editButton.svg"
                  width={100}
                  height={100}
                  className="w-10 h-max "
                />
              </button>
              <button>
                <Image
                  alt="icon image"
                  src="/assets/playButton.svg"
                  width={100}
                  height={100}
                  className="w-20 h-max "
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
            </>
          )}
        </div>
      </section>

      {deleteAsk && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <section className="h-[191px] w-[300px] flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%] sm:rounded-lg bg-[url('/assets/deleteGroup.svg')] bg-center bg-no-repeat">
            <p> گروه زهرا و کیانا </p>
            <div className="flex gap-2 bottom-6 left-6 absolute">
              <button onClick={() => setDeleteAsk(false)}>
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
                  setDeleteAsk(false);
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
          </section>
        </div>
      )}
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
};

export default Page;
