import { Briefcase, UserCheck, PieChart } from "lucide-react";
import Hero1 from "@/public/svg/hero1.svg";
import Hero2 from "@/public/svg/hero2.svg";
import Hero3 from "@/public/svg/hero3.svg";
import Why1 from "@/public/svg/why1.svg";
import Why2 from "@/public/svg/why2.svg";
import Why3 from "@/public/svg/why3.svg";
import Why4 from "@/public/svg/why4.svg";
import Why5 from "@/public/svg/why5.svg";
import Why6 from "@/public/svg/why6.svg";

export const DataConstant = {
  home: {
    hero: {
      title: "Step Into the Future of Hiring",
      subtitle: "Where Talent Meets Opportunity",
      desc: "An intelligent platform connecting top tech talent with leading companies\nthrough interactive interviews and precise performance analytics.",
      cta: "Explore Opportunities",
      pathIcons: [
        {
          id: "hero-icon-1",
          icon: <Briefcase className="w-5 h-5 text-white" />,
          className: "left-[15%] top-[15%]",
        },
        {
          id: "hero-icon-2",
          icon: <UserCheck className="w-5 h-5 text-white" />,
          className: "left-[50%] top-[70%]",
        },
        {
          id: "hero-icon-3",
          icon: <PieChart className="w-5 h-5 text-white" />,
          className: "left-[85%] top-[15%]",
        },
      ],
    },
    latestJobs: {
      title: "Latest Job Opportunities",
      subtitle: "Featured jobs posted recently",
    },
    redefining: {
      title: "Redefining How You Hire & Get Hired",
      desc: "We believe traditional hiring is broken. Our mission is to create a transparent, efficient, and AI-based ecosystem where developers can showcase their true potential, and companies can find the perfect fit faster.",
      bullets: [
        "Our Goal: To eliminate bias and focus on real-world skills.",
        "Our Mission: Empowering careers through technology.",
      ],
      cta: "Explore Opportunities",
      image: "/assets/images/ai-hiring.png",
    },
  },
  about: {
    brand: {
      name: "IntelliHire?",
      tagline: "Job Interviews in the Age of AI",
      subtitle: "Connecting interview-ready tech talent with top companies\nthrough smart, AI-driven simulations.",
    },
    hero: {
      title: "Hiring? Find Your Next Tech Star",
      subtitle: "Post job offers and let AI conduct the first round of technical interviews. Review detailed candidate reports and only interview the top performers.",
      cards: [
        {
          iconClassName: "bg-light-secondary dark:bg-transparent",
          icon: <Hero1 className="w-5 h-5 text-light-white dark:text-dark-white" />,
          className: "bg-light-blue50 dark:!bg-dark-primary-4 shadow-lg",
          title: "Post Jobs Easily",
          desc: "Create detailed job posts using our intuitive template-based forms. Quick setup, zero hassle, start receiving applications today.",
          large: true,
        },
        {
          iconClassName: "bg-light-secondary dark:bg-transparent",
          icon: <Hero2 className="w-5 h-5 text-light-white dark:text-dark-white" />,
          className: "bg-light-blue50 dark:!bg-dark-primary-4 shadow-lg",
          title: "Automated Filtering",
          desc: "Our AI screens 300+ candidates before you even touch the keyboard. Focus on talent that matters to your company.",
          large: true,
        },
        {
          iconClassName: "bg-light-secondary dark:bg-transparent",
          icon: <Hero3 className="w-5 h-5 text-light-white dark:text-dark-white" />,
          className: "bg-light-blue50 dark:!bg-dark-primary-4 shadow-lg",
          title: "Data-Driven Insights",
          desc: "Receive detailed candidate reports including performance analysis on all previous tests and personality benchmark reports.",
          large: true,
        },
      ],
    },
    why: {
      title: "Why Choose IntelliHire?",
      subtitle: "AI-powered simulations, detailed feedback, and personalized recommendations for every candidate.",
      cards: [
        {
          iconClassName: "bg-light-white dark:bg-transparent border border-ui-borderLight",
          icon: <Why1 className="w-5 h-5 text-light-secondary dark:text-dark-white" />,
          title: "Effortless Job Posting",
          desc: "For Companies: Quickly create and publish job offers. Our streamlined process ensures you reach the right candidates fast.",
        },
        {
          iconClassName: "bg-light-white dark:bg-transparent border border-ui-borderLight",
          icon: <Why2 className="w-5 h-5 text-light-secondary dark:text-dark-white" />,
          title: "AI Interview",
          desc: "Engage in a realistic real-time voice-based tech interview. Our AI simulates top-tier interviewing experiences for every candidate.",
        },
        {
          iconClassName: "bg-light-white dark:bg-transparent border border-ui-borderLight",
          icon: <Why3 className="w-5 h-5 text-light-secondary dark:text-dark-white" />,
          title: "Detailed Feedback",
          desc: "For Candidates: Receive comprehensive reports on your interview performance, highlighting strengths, technical skill gaps, and practical steps to improve.",
        },
        {
          iconClassName: "bg-light-white dark:bg-transparent border border-ui-borderLight",
          icon: <Why4 className="w-5 h-5 text-light-secondary dark:text-dark-white" />,
          title: "Ad Moderation & Insights",
          desc: "For Companies: Full moderation capabilities and in-depth performance analytics. Track application metrics, screen candidates, and optimize your listings in real time.",
        },
        {
          iconClassName: "bg-light-white dark:bg-transparent border border-ui-borderLight",
          icon: <Why5 className="w-5 h-5 text-light-secondary dark:text-dark-white" />,
          title: "Integrated Code Editor",
          desc: "A dedicated coding environment within the interview that allows candidates to write, debug, and run code.",
        },
        {
          iconClassName: "bg-light-white dark:bg-transparent border border-ui-borderLight",
          icon: <Why6 className="w-5 h-5 text-light-secondary dark:text-dark-white" />,
          title: "Model Answer Comparison",
          desc: "Learn where you rank easily. Our process ensures your response is scored against AI-generated model answers.",
        },
      ],
    },
  },
  footer: {
    brand: {
      desc: "The future of technical recruitment. AI-powered, unbiased, and efficient.",
      socials: [
        { icon: "pi pi-facebook", link: "#" },
        { icon: "pi pi-twitter", link: "#" },
      ],
    },
    sections: [
      {
        title: "Navigation",
        links: [
          { text: "Home", href: "/" },
          { text: "Browse Jobs", href: "/jobs" },
          { text: "Features", href: "/features" },
          { text: "About Us", href: "/about" },
          { text: "Moderate My Job", href: "/dashboard" },
        ],
      },
      {
        title: "Legal",
        links: [
          { text: "Privacy Policy", href: "/intelliHire/privacy" },
          { text: "Terms of Service", href: "/intelliHire/terms" },
          { text: "Cookie Policy", href: "/intelliHire/cookies" },
        ],
      },
      {
        title: "Contact Us",
        items: [
          { type: "email", icon: "pi pi-envelope", text: "support@intellihire.com", href: "mailto:support@intellihire.com" },
          { type: "phone", icon: "pi pi-phone", text: "01183291091", href: "tel:01183291091" },
          { type: "location", icon: "pi pi-map-marker", text: "Cairo", href: "https://maps.google.com/?q=Cairo,Egypt" },
        ],
      },
    ],
    copyright: "© 2026 IntelliHire. All Rights Reserved.",
  },
};
