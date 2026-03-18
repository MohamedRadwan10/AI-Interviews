import { Mail, Phone, MapPin } from "lucide-react";

export const footerConfig = {
  brand: {
    name: "IntelliHire",
    tagline:
      "The future of technical recruitment. AI-powered, unbiased, and efficient.",
    logo: {
      text: "IntelliHire",
      className: "text-2xl font-bold text-blue-400",
    },
  },

  sections: [
    {
      title: "Navigation",
      links: [
        { label: "Home", path: "/" },
        { label: "Browse Jobs", path: "/browse-jobs" },
        { label: "Features", path: "/features" },
        { label: "About Us", path: "/about-us" },
        { label: "Moderate My Job", path: "/moderate-job" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms of Service", path: "/terms-of-service" },
        { label: "Cookie Policy", path: "/cookie-policy" },
      ],
    },
  ],

  contact: {
    title: "Contact Us",
    items: [
      {
        icon: Mail,
        text: "Support@IntelliHire.com",
        type: "email",
        value: "Support@IntelliHire.com",
        href: "mailto:Support@IntelliHire.com",
      },
      {
        icon: Phone,
        text: "01183291091",
        type: "phone",
        value: "01183291091",
        href: "tel:01183291091",
      },
      {
        icon: MapPin,
        text: "Cairo",
        type: "text",
        value: "Cairo",
      },
    ],
  },

  copyright: {
    text: "IntelliHire",
    rights: "All rights reserved.",
    year: new Date().getFullYear(),
  },

  styles: {
    footer: "bg-gray-900 text-white py-12",
    container: "container mx-auto px-4",
    grid: "grid grid-cols-1 md:grid-cols-4 gap-8",
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
      muted: "text-gray-400",
      hover: "hover:text-blue-400",
    },
    border: "border-t border-gray-800",
  },
};

export const navigation = [
  { label: "Home", path: "/intelliHire" },
  { label: "About Us", path: "/intelliHire/about" },
  { label: "Jobs", path: "/intelliHire/jobs" },
  { label: "Moderate My Job", path: "/intelliHire/moderate-job" },
];
