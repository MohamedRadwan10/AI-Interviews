"use client";

import MainImage from "@/Components/Common/Image";
import React from "react";
import logoImage from "@/public/assets/notFound.png";
import MainButton from "@/Components/Common/MainButton";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/intelliHire");
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-light-primary dark:bg-dark-primary-1 py-12">
      <div className="container mx-auto px-4">
        <div className="w-full text-center flex flex-col items-center">
          
          <div className="relative group mb-8">
            <div className="absolute inset-0 "></div>
            <MainImage
              src={logoImage.src}
              alt="404 - Not Found - AI Interview"
              imageClassName="w-full max-w-2xl mx-auto relative z-10 drop-shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]"
              preview={false}
            />
          </div>
          <MainButton
            onClick={handleBack}
            className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primaryDark text-white font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-brand-accent/25 hover:-translate-y-1"
          >
            <i className="pi pi-arrow-left mr-2 text-sm"></i>
            Return to Dashboard
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
