"use client";
import React from "react";
import { get } from "lodash-es";
import Link from "next/link";
import MainText from "@/Components/Common/MainText";
import MainForm from "@/Components/Common/MainForm";
import { GenericError } from "@/Components/Errors";
import AuthLogo from "@/Components/auth/components/AuthLogo";
import AuthSuccessBanner from "@/Components/auth/components/SuccsessBanner";
import AuthSocialRoleToggle from "@/Components/auth/components/AuthSocialRoleToggle";
import AuthSocialButtons from "@/Components/auth/components/AuthSocialButton";
import {useAuthPage} from "@/hooks/useAuth";

const AuthPageContent = ({ config, onSubmit, apiError, isLoading, type }) => {
  const {
    socialRole, isSuccess, isVerified,
    handleSubmit, handleSocialLogin, handleSocialRoleChange,
  } = useAuthPage({ config, onSubmit, type });

  const pageTitle     = get(config, "pageTitle");
  const pageSubtitle  = get(config, "pageSubtitle");
  const footerLinks   = get(config, "footerLinks", []);
  const footerText    = get(config, "footerText");
  const footerSeparator = get(config, "footerSeparator");
  const hideSocial    = get(config, "hideSocial");

  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark-primary-1 bg-light-primary py-12">
      <div className="w-full max-w-2xl xs:px-2 sm:px-8 py-8 rounded-lg shadow-md dark:bg-dark-primary-3 bg-light-white">

        <AuthLogo />

        <div className="flex flex-col items-center mb-6">
          <MainText tag="p" title={pageTitle}    className="text-xl m-0 font-semibold text-light-black dark:text-dark-white text-center" />
          <MainText tag="p" title={pageSubtitle} className="text-sm m-0 text-ui-muted dark:text-ui-muted text-center" />
        </div>

        <GenericError error={apiError} className="mb-6 justify-center" />

        {isSuccess && (
          <AuthSuccessBanner
            title="Password reset successfully!"
            subtitle="You can now log in with your new password."
          />
        )}
        {isVerified && (
          <AuthSuccessBanner
            title="🎉 Email confirmed successfully!"
            subtitle="You can now log in to IntelliHire."
          />
        )}

        <MainForm config={config} onSubmit={handleSubmit} isLoading={isLoading} />

        {!hideSocial && (
          <>
            <div className="flex items-center justify-between gap-3 my-4 dark:text-dark-gray text-light-gray text-sm">
              <div className="w-1/3 h-[1px] dark:bg-dark-gray bg-light-gray" />
              OR CONTINUE WITH
              <div className="w-1/3 h-[1px] dark:bg-dark-gray bg-light-gray" />
            </div>

            {type === "login" && (
              <AuthSocialRoleToggle socialRole={socialRole} onRoleChange={handleSocialRoleChange} />
            )}

            <AuthSocialButtons onSocialLogin={handleSocialLogin} />
          </>
        )}

        {footerLinks.length > 0 && (
          <MainText tag="p" className="text-center text-sm dark:text-dark-gray text-light-gray mt-6">
            {footerText}
            {footerLinks.map((link, index) => {
              const href = get(link, "href");
              const text = get(link, "text");
              return (
                <React.Fragment key={href}>
                  <Link href={href} className="mx-1">
                    <MainText title={text} className="dark:text-dark-primary-2 text-light-secondary cursor-pointer inline" />
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

export default AuthPageContent;