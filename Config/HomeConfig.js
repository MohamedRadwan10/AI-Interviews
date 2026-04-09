import { Briefcase, UserCheck, PieChart } from "lucide-react";

export const HomeConfig = {
  hero: {
    title: "Step Into the Future of Hiring",
    subtitle: "Where Talent Meets Opportunity",
    desc: "An intelligent platform connecting top tech talent with leading companies\nthrough interactive interviews and precise performance analytics.",
    cta: "Explore Opportunities",
    pathIcons: [
      {
        icon: <Briefcase className="w-5 h-5 text-white" />,
        className: "left-[15%] top-[15%]",
      },
      {
        icon: <UserCheck className="w-5 h-5 text-white" />,
        className: "left-[50%] bottom-[-10%]",
      },
      {
        icon: <PieChart className="w-5 h-5 text-white" />,
        className: "right-[15%] top-[15%]",
      },
    ],
  },
  jobs: {
    title: "Latest Job Opportunities",
    subtitle: "Featured jobs posted recently",
    list: [
      {
        id: 1,
        logo: "TC",
        title: "Frontend Developer",
        company: "Tech Corps",
        type: "Full Time",
        desc: "We are looking for a Frontend Developer experienced in React and Tailwind CSS to join our team.",
      },
      {
        id: 2,
        logo: "TC",
        title: "Frontend Developer",
        company: "Tech Corps",
        type: "Full Time",
        desc: "We are looking for a Frontend Developer experienced in React and Tailwind CSS to join our team.",
      },
      {
        id: 3,
        logo: "TC",
        title: "Frontend Developer",
        company: "Tech Corps",
        type: "Full Time",
        desc: "We are looking for a Frontend Developer experienced in React and Tailwind CSS to join our team.",
      },
    ],
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
};
