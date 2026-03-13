"use client";

import { useState } from "react";
import AccountTypeCard from "../Cards/AccountType";
import { map } from "lodash-es";
import MainButton from "../Common/MainButton";
import MainText from "../Common/MainText";
import { useRouter } from "next/navigation";

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

  return (
    <div className="min-h-screen dark:bg-dark-primary-1 bg-light-primary flex flex-col items-center justify-center px-6">
      <MainText
        tag="h1"
        title="How do you want to use the platform?"
        className="text-light-black dark:text-dark-white text-2xl font-semibold mb-2"
      />

      <MainText
        tag="p"
        title="Select the account type to continue"
        className="text-light-gray dark:text-dark-gray text-sm mb-10"
      />

      <div className="flex gap-6 flex-wrap justify-center">
        {map(accountTypes, (item, idx) => (
          <AccountTypeCard
            key={idx}
            item={item}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>

      <MainButton
        disabled={!selected}
        onClick={handleCreate}
        className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Create an account
      </MainButton>

      <MainText
        title="Return to Home"
        className="text-light-gray dark:text-dark-gray text-sm mt-4 cursor-pointer "
      />
    </div>
  );
};
export default AccountType;
