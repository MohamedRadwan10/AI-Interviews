"use client";
import React from "react";
import { get } from "lodash-es";
import MainImage from "@/Components/Common/Image";
import MainText from "@/Components/Common/MainText";
import logoImage from "@/public/assets/logo.png";
import MainButton from "@/Components/Common/MainButton";
import Link from "next/link";
import MainForm from "../Common/MainForm";

const AuthPage = ({ config, onSubmit }) => {
  const logo = get(logoImage, "src");
  const pageTitle = get(config, "pageTitle");
  const pageSubtitle = get(config, "pageSubtitle");
  const footerLinks = get(config, "footerLinks", []);
  const footerText = get(config, "footerText");
  const footerSeparator = get(config, "footerSeparator");

  const handleSubmit = async (values) => {
    onSubmit(values);
  };

  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark-primary-1 bg-light-primary">
      <div className="min-w-[40%] py-4 px-6 rounded-lg shadow-md dark:bg-dark-primary-3 bg-light-white">
        <div className="flex items-center justify-center mb-3 w-full">
          <MainImage
            src={logo}
            alt="Logo"
            imageClassName="max-h-12 max-w-24"
            preview={false}
          />
          <div className="flex">
            <MainText
              tag="h2"
              title="Intelli"
              className="text-3xl m-0 font-bold text-light-black dark:text-dark-white"
            />
            <MainText
              tag="h2"
              title="Hire"
              className="text-3xl m-0 font-bold text-light-secondary dark:text-dark-secondary"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <MainText
            tag="p"
            title={pageTitle}
            className="text-xl m-0 font-semibold text-light-black dark:text-dark-white"
          />
          <MainText
            tag="p"
            title={pageSubtitle}
            className="text-sm m-0 text-light-gray dark:text-dark-gray"
          />
        </div>

        <MainForm config={config} onSubmit={handleSubmit} />

        <div className="flex items-center justify-between gap-3 my-4 dark:text-dark-gray text-light-gray text-sm">
          <div className="w-1/3 h-[1px] dark:bg-dark-gray bg-light-gray"></div>
          OR CONTINUE WITH
          <div className="w-1/3 h-[1px] dark:bg-dark-gray bg-light-gray"></div>
        </div>

        <div className="flex gap-4">
          <MainButton
            type="button"
            className="flex items-center justify-center gap-2 flex-1 dark:bg-dark-primary-1 bg-light-primary py-2 rounded-md text-light-black dark:text-dark-white"
          >
            <MainImage
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              imageClassName="w-5"
              preview={false}
            />
            Google
          </MainButton>

          <MainButton
            type="button"
            className="flex items-center justify-center gap-2 flex-1 dark:bg-dark-primary-1 bg-light-primary py-2 rounded-md text-light-black dark:text-dark-white"
          >
            <MainImage
              src="https://www.svgrepo.com/show/448239/microsoft.svg"
              alt="Microsoft"
              imageClassName="w-5"
              preview={false}
            />
            Microsoft
          </MainButton>
        </div>

        {footerLinks.length > 0 && (
          <MainText
            tag="p"
            className="text-center text-sm dark:text-dark-gray text-light-gray mt-6"
          >
            {footerText}
            {footerLinks.map((link, index) => {
              const href = get(link, "href");
              const text = get(link, "text");
              return (
                <React.Fragment key={href}>
                  <Link href={href} className="mx-1">
                    <MainText
                      title={text}
                      className="dark:text-dark-primary-2 text-light-secondary cursor-pointer inline"
                    />
                  </Link>
                  {index < footerLinks.length - 1 && footerSeparator && (
                    <span className="mx-1">{footerSeparator}</span>
                  )}
                </React.Fragment>
              );
            })}
          </MainText>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
