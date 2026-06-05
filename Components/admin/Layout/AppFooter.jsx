"use client";
import React from "react";
import { get, map } from "lodash-es";
import { DataConstant } from "@/Config/DataConstant";
import { navigation } from "@/Config/LayoutConfig";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useState, useEffect } from "react";
import FooterBrand from "./Components/FooterBrand";
import FooterColumn from "./Components/FooterColumn";
import FooterBottom from "./Components/FooterBottom";

const AppFooter = () => {
  const { accountData } = useUserAccount();
  const userType = get(accountData, "userType");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const brandDesc = get(DataConstant, "footer.brand.desc", "");
  const configSections = get(DataConstant, "footer.sections", []);
  const copyright = get(DataConstant, "footer.copyright", "");

  const filteredNavigation = navigation.filter((item) => {
    if (item.label === "Post Job" && userType === "Individual") {
      return false;
    }
    if (item.label === "Jobs" && userType === "Company") {
      return false;
    }
    if (item.label === "Dashboard" && userType === "Company") {
      item.path = "/intelliHire/company-dashboard";
      return true;
    }
    return true;
  });

  const displayNavigation = isMounted ? filteredNavigation : navigation;

  const allSections = [
    { title: "Platform", links: displayNavigation },
    ...configSections.filter(s => s.title !== "Navigation")
  ];

  return (
    <footer className="w-full pt-20 pb-8 bg-gradient-to-b from-transparent to-light-primary/20 dark:to-dark-primary-4/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          <div className="lg:col-span-5">
            <FooterBrand desc={brandDesc} />
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            {map(allSections, (section, idx) => (
              <FooterColumn 
                key={idx} 
                title={section.title} 
                links={section.links || section.items} 
              />
            ))}
          </div>
        </div>

        <FooterBottom copyright={copyright} />
      </div>
    </footer>
  );
};

export default AppFooter;
