"use client";

import { useState } from "react";
import { map, get } from "lodash-es";
import MainButton from "@/Components/Common/MainButton";
import MainText from "@/Components/Common/MainText";
import { useRouter } from "next/navigation";
import MainCard from "@/Components/Common/Cards";

const accountTypes = [
  {
    type: "company",
    title: "Employer/Company",
    description: "I want to post job openings, find candidates, and hire them.",
    icon: "pi pi-building",
  },
  {
    type: "candidate",
    title: "Job seeker",
    description:
      "I am looking for technical jobs; I want to conduct smart interviews and get an evaluation of my performance.",
    icon: "pi pi-user",
  },
];

const AccountType = () => {
  const [selected, setSelected] = useState();
  const router = useRouter();

  const handleCreate = () => {
    if (!selected) return;
    router.push(`/${selected}-register`);
  };

  const pageTitle = "How do you want to use the platform?";
  const pageSubtitle = "Select the account type to continue";

  return (
    <div className="min-h-screen dark:bg-dark-primary-1 bg-light-primary flex flex-col items-center justify-center px-6">
      <MainText
        tag="h1"
        title={pageTitle}
        className="text-light-black dark:text-dark-white text-2xl font-semibold mb-2"
      />

      <MainText
        tag="p"
        title={pageSubtitle}
        className="text-ui-muted dark:text-ui-muted text-sm mb-10"
      />

      <div className="flex gap-6 flex-wrap justify-center">
        {map(get({ items: accountTypes }, "items", []), (item, idx) => {
          const type = get(item, "type");
          return (
            <MainCard
              key={idx}
              type="accountType"
              data={item}
              selected={selected}
              onSelect={setSelected}
            />
          );
        })}
      </div>

      <MainButton
        disabled={!selected}
        onClick={handleCreate}
        className="mt-10 px-6 py-3 bg-brand-primary hover:bg-brand-primaryDark text-white rounded-lg transition"
      >
        Create an account
      </MainButton>

      <MainText
        title="Return to Home"
        className="text-ui-muted dark:text-ui-muted text-sm mt-4 cursor-pointer "
      />
    </div>
  );
};
export default AccountType;
