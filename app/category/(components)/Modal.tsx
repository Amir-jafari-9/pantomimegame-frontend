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

const Modal = ({ category }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-white border-2 border-purple-800 text-purple-800 p-5 rounded-2xl font-semibold">
          {category}
        </button>
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
