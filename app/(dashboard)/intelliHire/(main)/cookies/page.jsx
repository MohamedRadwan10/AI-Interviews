"use client";
import React from "react";
import MainText from "@/Components/Common/MainText";
import { Cookie, Info, Settings, HelpCircle } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-6 sm:px-8 dark:bg-dark-primary-1 bg-light-primary text-ui-textMain dark:text-dark-white transition-colors duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-ui-borderLight dark:border-dark-gray/30 pb-6">
        <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary dark:text-brand-accent animate-pulse">
          <Cookie className="w-10 h-10" />
        </div>
        <div>
          <MainText tag="h1" title="Cookie Policy" className="text-4xl font-extrabold tracking-tight" />
          <MainText tag="p" title="Last Updated: May 26, 2026" className="text-ui-textMuted dark:text-ui-muted text-sm mt-1" />
        </div>
      </div>

      <div className="space-y-8 text-base leading-relaxed text-ui-textMuted dark:text-ui-muted">
        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <Info className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">1. What are Cookies?</h2>
          </div>
          <p className="pl-8">
            Cookies are small text files stored on your device when you load websites in a browser. They are widely used to keep track of your preferences, keep you logged in to your account, and provide analytics on how you interact with our platform.
          </p>
        </section>

        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">2. How We Use Cookies</h2>
          </div>
          <p className="pl-8">
            We use both first-party and third-party cookies to improve your user experience:
          </p>
          <ul className="list-disc pl-14 mt-2 space-y-1">
            <li><strong>Essential Cookies:</strong> Required for the fundamental security and operational integrity of authentication.</li>
            <li><strong>Preference Cookies:</strong> Allow the website to remember your light/dark theme preference and settings.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand website traffic, interaction patterns, and performance metrics.</li>
          </ul>
        </section>

        <section className="bg-light-white dark:bg-dark-primary-3/30 p-6 rounded-2xl border border-ui-borderLight/50 dark:border-dark-gray/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-3 text-brand-primary dark:text-brand-accent">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl font-bold dark:text-white text-ui-textMain">3. Managing Your Cookies</h2>
          </div>
          <p className="pl-8">
            Most web browsers allow you to control cookies through their settings preferences. Removing or disabling essential cookies might impact certain core functionalities of the IntelliHire platform, such as persistent sessions.
          </p>
        </section>
      </div>
    </div>
  );
}
