import Hero1 from "@/public/svg/hero1.svg";
import Hero2 from "@/public/svg/hero2.svg";
import Hero3 from "@/public/svg/hero3.svg";
import Why1 from "@/public/svg/why1.svg";
import Why2 from "@/public/svg/why2.svg";
import Why3 from "@/public/svg/why3.svg";
import Why4 from "@/public/svg/why4.svg";
import Why5 from "@/public/svg/why5.svg";
import Why6 from "@/public/svg/why6.svg";

export const AboutConfig = {
  brand: {
    name: "IntelliHire?",
    tagline: "Job Interviews in the Age of AI",
    subtitle:
      "Connecting interview-ready tech talent with top companies\nthrough smart, AI-driven simulations.",
  },
  hero: {
    title: "Hiring? Find Your Next Tech Star",
    subtitle:
      "Post job offers and let AI conduct the first round of technical interviews. Review detailed candidate reports and only interview the top performers.",
    cards: [
      {
        iconClassName: "bg-light-secondary dark:bg-transparent",
        icon: (
          <Hero1 className="w-5 h-5 text-light-white dark:text-dark-white" />
        ),
        className: "bg-light-blue50 dark:!bg-dark-primary-4 shadow-lg",
        title: "Post Jobs Easily",
        desc: "Create detailed job posts using our intuitive template-based forms. Quick setup, zero hassle, start receiving applications today.",
      },
      {
        iconClassName: "bg-light-secondary dark:bg-transparent",
        icon: (
          <Hero2 className="w-5 h-5 text-light-white dark:text-dark-white" />
        ),
        className: "bg-light-blue50 dark:!bg-dark-primary-4 shadow-lg",
        title: "Automated Filtering",
        desc: "Our AI screens 300+ candidates before you even touch the keyboard. Focus on talent that matters to your company.",
      },
      {
        iconClassName: "bg-light-secondary dark:bg-transparent",
        icon: (
          <Hero3 className="w-5 h-5 text-light-white dark:text-dark-white" />
        ),
        className: "bg-light-blue50 dark:!bg-dark-primary-4 shadow-lg",
        title: "Data-Driven Insights",
        desc: "Receive detailed candidate reports including performance analysis on all previous tests and personality benchmark reports.",
      },
    ],
  },
  why: {
    title: "Why Choose IntelliHire?",
    subtitle:
      "AI-powered simulations, detailed feedback, and personalized recommendations for every candidate.",
    cards: [
      {
        iconClassName: "bg-light-white dark:bg-transparent border border-light-gray",
        icon: (
          <Why1 className="w-5 h-5 text-light-secondary dark:text-dark-white" />
        ),
        className: "",
        title: "Effortless Job Posting",
        desc: "For Companies: Quickly create and publish job offers. Our streamlined process ensures you reach the right candidates fast.",
      },
      {
        iconClassName: "bg-light-white dark:bg-transparent border border-light-gray",
        icon: (
          <Why2 className="w-5 h-5 text-light-secondary dark:text-dark-white" />
        ),
        className: "",
        title: "AI Interview",
        desc: "Engage in a realistic real-time voice-based tech interview. Our AI simulates top-tier interviewing experiences for every candidate.",
      },
      {
        iconClassName: "bg-light-white dark:bg-transparent border border-light-gray",
        icon: (
          <Why3 className="w-5 h-5 text-light-secondary dark:text-dark-white" />
        ),
        className: "",
        title: "Detailed Feedback",
        desc: "For Companies: Quickly create and publish job offers. Our streamlined process ensures results for every candidate.",
      },
      {
        iconClassName: "bg-light-white dark:bg-transparent border border-light-gray",
        icon: (
          <Why4 className="w-5 h-5 text-light-secondary dark:text-dark-white" />
        ),
        className: "",
        title: "Ad Moderation & Insights",
        desc: "For Companies: Use our full control to separate your job ads. Our streamlined process ensures top-tier ads.",
      },
      {
        iconClassName: "bg-light-white dark:bg-transparent border border-light-gray",
        icon: (
          <Why5 className="w-5 h-5 text-light-secondary dark:text-dark-white" />
        ),
        className: "",
        title: "Integrated Code Editor",
        desc: "A dedicated coding environment within the interview that allows candidates to write, debug, and run code.",
      },
      {
        iconClassName: "bg-light-white dark:bg-transparent border border-light-gray",
        icon: (
          <Why6 className="w-5 h-5 text-light-secondary dark:text-dark-white" />
        ),
        className: "",
        title: "Model Answer Comparison",
        desc: "Learn where you rank easily. Our process ensures your response is scored against AI-generated model answers.",
      },
    ],
  },
};
