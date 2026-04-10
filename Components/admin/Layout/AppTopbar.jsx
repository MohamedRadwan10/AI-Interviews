import MainText from "@/Components/Common/MainText";
import React from "react";
import { navigation } from "@/Config/LayoutConfig";
import { get, map } from "lodash-es";
import MainImage from "@/Components/Common/Image";
import logoImage from "@/public/assets/logo.png";
import Link from "next/link";
import Theme from "./Components/Theme";
import { Avatar } from "primereact/avatar";

const TopBar = () => {
  const logo = get(logoImage, "src");

  return (
    <header className="shadow-sm py-4">
      <div className="container mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <div className="flex items-center justify-center md:justify-start gap-2 w-full md:w-1/3">
            <MainImage
              src={logo}
              alt="Logo"
              imageClassName="max-h-12 max-w-24"
              preview={false}
            />
            <Link href="/intelliHire" className="flex">
              <MainText
                tag="h2"
                title="Intelli"
                className="text-2xl m-0 font-bold text-light-black dark:text-dark-white"
              />
              <MainText
                tag="h2"
                title="Hire"
                className="text-2xl m-0 font-bold text-light-secondary dark:text-dark-secondary"
              />
            </Link>
          </div>

          <nav className="flex justify-center gap-3 w-full md:w-1/3 overflow-x-auto pb-2 md:pb-0">
            <ul className="flex items-center space-x-6 md:space-x-8 px-2 md:px-0">
              {map(navigation, (item) => {
                const label = get(item, "label");
                const path = get(item, "path");

                return (
                  <li key={path} className="whitespace-nowrap">
                    <Link href={path}>
                      <MainText
                        title={label}
                        className="cursor-pointer transition-colors duration-200 text-light-black dark:text-dark-white whitespace-nowrap"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex justify-center md:justify-end gap-4 w-full md:w-1/3">
            <Theme />
            <Avatar icon="pi pi-user" shape="circle" className="bg-dark-primary-2 text-dark-black cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
