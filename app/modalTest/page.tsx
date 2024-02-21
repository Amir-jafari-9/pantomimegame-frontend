"use client";

import React, { useState } from "react";
import MyModalLink from "./MyModalLink";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler for opening the modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Handler for closing the modal
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
        <h1 className="text-white">hiiiiiiii</h1>
      <MyModalLink
        isOpen={isModalOpen}
        targetRoute="/modalTest"
        modalStateRoute="/modalTest?categoty=to"
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      {isModalOpen && <div>hi</div>}
    </div>
  );
};

export default Page;
