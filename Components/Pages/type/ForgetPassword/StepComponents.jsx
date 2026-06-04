import React from "react";
import { getVal } from "@/Utils/Func/Common";
import { InputOtp } from "primereact/inputotp";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import MainForm from "@/Components/Common/MainForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const EmailStep = ({ config, onSubmit, isLoading }) => {
  return (
    <div className="w-full">
      <MainForm config={config} onSubmit={onSubmit} isLoading={isLoading} />
      <div className="flex justify-center mt-6">
        <Link href="/login" className="flex items-center gap-2 text-sm text-ui-muted hover:text-brand-primary transition-colors">
          <ArrowLeft size={16} />
          <MainText title="Back to Login" />
        </Link>
      </div>
    </div>
  );
};

export const OTPStep = ({ config, otp, onOtpChange, onSubmit, isLoading, onResend }) => {
  const gv = (obj, path, fb) => getVal(obj, null, path, fb);
  const footerLink = gv(config, "footerLinks[0]");
  const footerText = gv(config, "footerText");
  const submitText = gv(config, "submitButtonText");
  const footerLinkText = gv(footerLink, "text");

  const handleOtpChange = (e) => onOtpChange(e.value);
  const handleSubmit = () => onSubmit();

  return (
    <div className="w-full space-y-10">
      <style>{`
        .otp-container .p-inputtext {
          width: 2.75rem !important;
          height: 3.75rem !important;
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          text-align: center !important;
          border-radius: 1rem !important;
          transition: all 0.2s ease-in-out !important;
          margin: 0 0.25rem !important;
          outline: none !important;
        }

        @media (min-width: 640px) {
          .otp-container .p-inputtext {
            width: 3.5rem !important;
            height: 4.75rem !important;
            font-size: 1.875rem !important;
            margin: 0 0.375rem !important;
          }
        }
        
        /* Light Mode Styles */
        html:not(.dark) .otp-container .p-inputtext {
          background-color: #f1f5f9 !important; /* Slate 100 - clear grey bg */
          border: 2px solid #cbd5e1 !important; /* Slate 300 - clear visible border */
          color: #0f172a !important; /* Slate 900 - dark text */
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05) !important;
        }
        
        html:not(.dark) .otp-container .p-inputtext:focus {
          border-color: #2563ea !important; /* brand.primary */
          background-color: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15) !important;
        }

        /* Dark Mode Styles */
        html.dark .otp-container .p-inputtext {
          background-color: #0f172a !important; /* dark.primary.1 */
          border: 2px solid rgba(255, 255, 255, 0.15) !important; /* Light border */
          color: #ffffff !important;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.2) !important;
        }

        html.dark .otp-container .p-inputtext:focus {
          border-color: #3b82f6 !important; /* brand.accent */
          background-color: #1e293b !important; /* dark.primary.3 */
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
        }
      `}</style>

      <div className="flex justify-center otp-container">
        <InputOtp
          value={otp}
          onChange={handleOtpChange}
          length={6}
          disabled={isLoading}
        />
      </div>

      <MainButton 
        onClick={handleSubmit} 
        isLoading={isLoading}
        className="w-full flex justify-center items-center py-5 bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primaryDark hover:to-brand-secondaryDark text-white rounded-2xl font-bold shadow-2xl transform active:scale-[0.98] transition-all border-none"
      >
        {submitText}
      </MainButton>

      <div className="text-center flex items-center justify-center gap-1.5 flex-wrap">
        <MainText title={footerText} className="text-ui-textMuted dark:text-dark-gray text-sm" />
        <button 
          type="button" 
          onClick={onResend} 
          className="text-brand-primary dark:text-brand-accent text-sm font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
        >
          {footerLinkText}
        </button>
      </div>
    </div>
  );
};

export const PasswordStep = ({ config, onSubmit, isLoading }) => {
  const gv = (obj, path, fb) => getVal(obj, null, path, fb);
  const footerLink = gv(config, "footerLinks[0]");
  const footerLinkHref = gv(footerLink, "href", "#");
  const footerLinkText = gv(footerLink, "text");

  return (
    <div className="w-full">
      <MainForm config={config} onSubmit={onSubmit} isLoading={isLoading} />
      <div className="flex justify-center mt-6">
        <Link href={footerLinkHref} className="text-sm text-ui-muted hover:text-brand-primary transition-colors">
          <MainText title={footerLinkText} />
        </Link>
      </div>
    </div>
  );
};
