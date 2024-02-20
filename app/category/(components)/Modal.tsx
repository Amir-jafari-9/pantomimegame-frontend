"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

const Modal = ({ categoryTitle, categoryIcon, categoryId }: any ,{onClick}:any) => {
  const handleLevelButtonClick = (categoryId: string, level: number) => {
    const apiUrl = `http://localhost:8000/api/v1/words/word?category=${categoryId}&level=${level}`;
    console.log("API URL:", apiUrl);
    
    return apiUrl; // Return the apiUrl value
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-gray-50 flex flex-col justify-center items-center h-full w-full p-4 gap-3 shadow-lg rounded-2xl  hover:shadow-2xl  hover:scale-105 transition-transform active:translate-y-1">
          <Image alt="icon image" src={categoryIcon} width={100} height={100} />
          <p className="text-xs font-medium lg:text-base">{categoryTitle}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <div className="flex flex-col p-5">
              <button
                type="button"
                onClick={() => handleLevelButtonClick(categoryId, 1)}
              >
                <Link
                  href="../../game"
                  className="hover:scale-105 transition-transform active:translate-y-1"
                >
                  <Image
                    alt="icon image"
                    src="/assets/level-easy.svg"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </Link>
              </button>
              <button
                type="button"
                onClick={() => handleLevelButtonClick(categoryId, 2)}
              >
                <Link
                  href="../../game"
                  className="hover:scale-105 transition-transform active:translate-y-1"
                >
                  <Image
                    alt="icon image"
                    src="/assets/level-medium.svg"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </Link>
              </button>
              <button
                type="button"
                onClick={() => handleLevelButtonClick(categoryId, 3)}
              >
                <Link
                  href="../../game"
                  className="hover:scale-105 transition-transform active:translate-y-1"
                >
                  <Image
                    alt="icon image"
                    src="/assets/level-hard.svg"
                    width={100}
                    height={100}
                    className="w-full"
                  />
                </Link>
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
