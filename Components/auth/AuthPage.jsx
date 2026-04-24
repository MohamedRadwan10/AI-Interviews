"use client";
import React from "react";
import { get } from "lodash-es";
import MainImage from "@/Components/Common/Image";
import MainText from "@/Components/Common/MainText";
import logoImage from "@/public/assets/logo.png";
import MainButton from "@/Components/Common/MainButton";
import Link from "next/link";
import MainForm from "@/Components/Common/MainForm";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { GenericError } from "@/Components/Errors";

const AuthPageContent = ({ config, onSubmit, apiError, isLoading }) => {
  const logo = get(logoImage, "src");
  const pageTitle = get(config, "pageTitle");
  const pageSubtitle = get(config, "pageSubtitle");
  const footerLinks = get(config, "footerLinks", []);
  const footerText = get(config, "footerText");
  const footerSeparator = get(config, "footerSeparator");
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  const handleSubmit = async (values) => {
    return onSubmit(values);
  };

  return (
    <div className="min-h-screen flex justify-center items-center dark:bg-dark-primary-1 bg-light-primary py-12">
      <div className="w-full max-w-2xl xs:px-2 sm:px-8 py-8 rounded-lg shadow-md dark:bg-dark-primary-3 bg-light-white">
        <div className="flex items-center justify-center mb-4 w-full">
          <MainImage
            src={logo}
            alt="IntelliHire Logo"
            width={60}
            height={40}
            priority={true}
            imageClassName="object-contain"
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
            className="text-xl m-0 font-semibold text-light-black dark:text-dark-white text-center"
          />
          <MainText
            tag="p"
            title={pageSubtitle}
            className="text-sm m-0 text-ui-muted dark:text-ui-muted text-center"
          />
        </div>

        <GenericError error={apiError} className="mb-6 justify-center" />

        {isSuccess && (
          <div className="w-full bg-status-success/10 border border-status-success/20 p-4 rounded-xl mb-6 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-status-success mt-0.5" />
            <div>
              <MainText title="Password reset successfully!" className="block text-white font-bold text-sm" />
              <MainText title="You can now log in with your new password." className="block text-dark-gray text-xs mt-1" />
            </div>
          </div>
        )}

        {searchParams.get("verified") === "true" && (
          <div className="w-full bg-status-success/10 border border-status-success/20 p-4 rounded-xl mb-6 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-status-success mt-0.5" />
            <div>
              <MainText title="🎉 Email confirmed successfully!" className="block text-white font-bold text-sm" />
              <MainText title="You can now log in to IntelliHire." className="block text-dark-gray text-xs mt-1" />
            </div>
          </div>
        )}

        <MainForm config={config} onSubmit={handleSubmit} isLoading={isLoading} />

        {!get(config, "hideSocial") && (
          <>
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
                  alt="Google Logo"
                  width={20}
                  height={20}
                  priority={true}
                  imageClassName="object-contain"
                />
                Google
              </MainButton>

              <MainButton
                type="button"
                className="flex items-center justify-center gap-2 flex-1 dark:bg-dark-primary-1 bg-light-primary py-2 rounded-md text-light-black dark:text-dark-white"
              >
                <MainImage
                  src="https://www.svgrepo.com/show/448239/microsoft.svg"
                  alt="Microsoft Logo"
                  width={20}
                  height={20}
                  priority={true}
                  imageClassName="object-contain"
                />
                Microsoft
              </MainButton>
            </div>
          </>
        )}

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

const AuthPage = (props) => {
  return (
    <Suspense fallback={<RouteLoading type="form" />}>
      <AuthPageContent {...props} />
    </Suspense>
  );
};

export default AuthPage;
