"use client";
import React, { useMemo } from "react";
import { Mail, Phone, Download, User } from "lucide-react";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainImage from "@/Components/Common/Image";
import { IMAGE_BASE_URL } from "@/Config/apiRegistry";

const ProfileHeader = ({ fullName, jobTitle, email, phoneNumber, photoUrl }) => {
  const avatarUrl = useMemo(() => {
    if (!photoUrl) return null;
    return photoUrl.startsWith("http") ? photoUrl : `${IMAGE_BASE_URL}${photoUrl}`;
  }, [photoUrl]);

  const handleDownload = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-light-white dark:bg-dark-primary-3 p-8 rounded-3xl border border-ui-borderLight dark:border-ui-border shadow-lg transition-colors duration-200">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center overflow-hidden shrink-0">
          {avatarUrl ? (
            <MainImage
              src={avatarUrl}
              alt={fullName}
              width={80}
              height={80}
              imageClassName="object-cover w-full h-full"
            />
          ) : (
            <User className="w-10 h-10 text-brand-primary" />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <MainText
            tag="h1"
            title={fullName || "No Name"}
            className="text-2xl font-bold text-ui-textMain dark:text-dark-white"
          />
          <MainText
            tag="p"
            title={jobTitle || "Job Title"}
            className="text-sm font-medium text-ui-textMuted dark:text-ui-muted"
          />
          <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-ui-textMuted dark:text-ui-muted">
            {email && (
              <div className="flex items-center gap-2 bg-light-blue50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-ui-borderLight dark:border-white/5">
                <Mail className="w-3.5 h-3.5 text-brand-primary" />
                <span>{email}</span>
              </div>
            )}
            {phoneNumber && (
              <div className="flex items-center gap-2 bg-light-blue50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-ui-borderLight dark:border-white/5">
                <Phone className="w-3.5 h-3.5 text-brand-primary" />
                <span>{phoneNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex shrink-0">
        <MainButton
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-2xl border-none hover:bg-brand-primaryDark transition-all shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </MainButton>
      </div>
    </div>
  );
};

export default ProfileHeader;
