"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import ModalOpen from "./ModalOpen";
import Link from "next/link";

const Modal = ({ categoryTitle, categoryIcon, categoryId }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for opening the modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Handler for closing the modal
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
      <button onClick={handleOpenModal}>
        <Link
          href="/"
          as="/?categoty=to"
          className="bg-gray-50 flex flex-col justify-center items-center h-full w-full p-4 gap-3 shadow-lg rounded-2xl  hover:shadow-2xl  hover:scale-105 transition-transform active:translate-y-1"
        >
          <Image alt="icon image" src={categoryIcon} width={100} height={100} />
          <p className="text-xs font-medium lg:text-base">{categoryTitle}</p>
        </Link>
      </button>
      {isModalOpen && <ModalOpen handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Modal;
