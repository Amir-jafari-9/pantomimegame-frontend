"use client";
import Lottie from "lottie-react";
import animationData from "@/public/assets/AnimationLoading.json"; // Import your JSON file

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="flex flex-col items-center justify-center text-center fixed left-[50%] top-[50%] z-50 max-w-lg translate-x-[-50%] translate-y-[-50%]  sm:rounded-lg w-full h-full">
        <Lottie animationData={animationData} className="w-full px-10" />
      </div>
    </div>
  );
}
