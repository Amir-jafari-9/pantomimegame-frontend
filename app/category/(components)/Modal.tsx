import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";

const Modal = ({ categoryTitle, categoryIcon }: any) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-gray-50 flex flex-col justify-center text-center items-center w-[4.1rem] h-24 gap-3 shadow-lg rounded-2xl font-medium">
          <Image
            alt="icon image"
            src={categoryIcon}
            width={100}
            height={100}
            className="w-9 h-9"
          />
          <p className="text-xs">{categoryTitle}</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="font-bold py-2 text-purple-800">سطح کلمه</p>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-5 p-5">
              <Link href="../../game"> آسون (۳ امتیاز) </Link>
              <Link href="../../game"> متوسط (۵ امتیاز) </Link>
              <Link href="../../game">سخت (۷ امتیاز) </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
