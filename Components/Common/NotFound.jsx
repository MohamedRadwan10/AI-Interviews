"use client";

import MainImage from "@/Components/Common/Image";
import React from "react";
import logoImage from "@/public/assets/notFound.png";
import MainButton from "@/Components/Common/MainButton";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("intelliHire");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center dark:bg-dark-primary-1 bg-light-primary">
      <div className="container mx-auto px-4 ">
        <div className="max-w-3xl mx-auto text-center">
          <MainImage
            src={logoImage.src}
            alt="404 - not found"
            imageClassName="w-full max-w-md mx-auto"
            preview={false}
          />

          <h1 className="text-8xl font-bold text-dark-primary-2 mb-4">404</h1>

          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Not Found!
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
            Sorry, the page you are looking for may have been moved, deleted, or
            it does not exist at all.
          </p>

          <MainButton
            onClick={handleBack}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Back to Home
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
