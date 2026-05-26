"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-6 sm:px-8 dark:bg-dark-primary-1 bg-light-primary text-ui-textMain dark:text-dark-white transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-ui-borderLight dark:border-dark-gray/30 pb-6">
        <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary dark:text-brand-accent animate-pulse">
          <Shield className="w-10 h-10" />
        </div>
        <div>
          <MainText tag="h1" title="Privacy Policy" className="text-4xl font-extrabold tracking-tight" />
          <MainText tag="p" title="Last Updated: May 26, 2026" className="text-ui-textMuted dark:text-ui-muted text-sm mt-1" />
        </div>
      </div>

      <div className="space-y-8 text-base leading-relaxed text-ui-textMuted dark:text-ui-muted">
        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <Eye className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">1. Information We Collect</h2>
          </div>
          <p className="pl-8">
            We collect personal information that you voluntarily provide to us when you register on our platform, express an interest in obtaining information about us or our services, or when you participate in technical interviews. This includes your name, email address, password, resume (CV), phone number, profile photo, and video/audio recordings from AI simulations.
          </p>
        </section>

        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">2. How We Use Your Information</h2>
          </div>
          <p className="pl-8">
            We use personal information collected via our platform for various business purposes, including:
          </p>
          <ul className="list-disc pl-14 mt-2 space-y-1">
            <li>Facilitating account creation and onboarding.</li>
            <li>Enabling smart, AI-driven mock interviews and screening.</li>
            <li>Generating detailed candidate report cards and benchmark evaluations.</li>
            <li>Helping employers screen, filter, and moderating job applications.</li>
            <li>Delivering administrative updates and marketing communications.</li>
          </ul>
        </section>

        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <Lock className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">3. Data Security & Storage</h2>
          </div>
          <p className="pl-8">
            We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. You are responsible for keeping your password confidential.
          </p>
        </section>
      </div>
    </div>
  );
}
