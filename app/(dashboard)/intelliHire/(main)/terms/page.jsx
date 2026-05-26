"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { Scale, BookOpen, AlertCircle, Sparkles } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-6 sm:px-8 dark:bg-dark-primary-1 bg-light-primary text-ui-textMain dark:text-dark-white transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-ui-borderLight dark:border-dark-gray/30 pb-6">
        <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary dark:text-brand-accent animate-pulse">
          <Scale className="w-10 h-10" />
        </div>
        <div>
          <MainText tag="h1" title="Terms of Service" className="text-4xl font-extrabold tracking-tight" />
          <MainText tag="p" title="Last Updated: May 26, 2026" className="text-ui-textMuted dark:text-ui-muted text-sm mt-1" />
        </div>
      </div>

      <div className="space-y-8 text-base leading-relaxed text-ui-textMuted dark:text-ui-muted">
        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">1. Agreement to Terms</h2>
          </div>
          <p className="pl-8">
            By accessing or using IntelliHire, you agree to be bound by these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using our services and must discontinue use immediately.
          </p>
        </section>

        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">2. Intellectual Property Rights</h2>
          </div>
          <p className="pl-8">
            Unless otherwise indicated, the platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the platform are owned or controlled by us or licensed to us.
          </p>
        </section>

        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <AlertCircle className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">3. AI Evaluation Disclaimer</h2>
          </div>
          <p className="pl-8">
            IntelliHire employs advanced Artificial Intelligence systems to evaluate candidate performance during simulations. While our models are trained to be objective and accurate, they are tools designed to support, not replace, final hiring decisions which remain at the sole discretion of the employers.
          </p>
        </section>
      </div>
    </div>
  );
}
