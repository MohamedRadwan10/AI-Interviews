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
    <header className="shadow-sm py-4 px-8">
      <div className="container  mx-auto">
        <div className="w-full flex items-center">
          <div className="flex items-center gap-2 w-1/3">
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

          <nav className="flex justify-center gap-3 w-1/3">
            <ul className="flex items-center space-x-8">
              {map(navigation, (item) => {
                const label = get(item, "label");
                const path = get(item, "path");

                return (
                  <li key={path}>
                    <Link href={path}>
                      <MainText
                        title={label}
                        className="cursor-pointer transition-colors duration-200 text-light-black dark:text-dark-white"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex justify-end gap-3 w-1/3">
            <Theme />
            <Avatar icon="pi pi-user" shape="circle" className="bg-dark-primary-2 text-dark-black cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
