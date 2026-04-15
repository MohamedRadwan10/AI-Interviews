/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Config/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Identity Colors
        brand: {
          primary: "#2563ea", // Primary brand color - Used for Main Buttons, Active Links, and Logo text (Hire)
          primaryDark: "#1d4ed8", // Darker shade of primary - Used for Button Hover states
          secondary: "#4338ca", // Secondary brand color - Used for Gradients, Accents, and specific UI highlights
          secondaryDark: "#3730a3", // Darker shade of secondary - Used for Secondary Button Hover states
          accent: "#3b82f6", // Accent color - Used for Decorative elements, Hero curves, and distinct UI icons
        },
        // Application Status Colors
        status: {
          success: "#22c55e", // Success state - Used for Confirmation messages, Check icons, and Verified states
          error: "#ef4444", // Error state - Used for Error alerts, Validation messages, and Delete buttons
          warning: "#f59e0b", // Warning state - Used for Alerts, Pending states, and Caution icons
          info: "#3b82f6", // Information state - Used for Help text, Info banners, and Tooltips
        },
        // General UI Components Colors (System-wide)
        ui: {
          muted: "#9CA3AF", // Muted text - Used for Subtitles, Placeholders, and less emphasized content
          border: "#1E293B", // Primary Border (Dark Mode) - Used for Card borders and separators in Dark Mode
          borderLight: "#E5E7EB", // Primary Border (Light Mode) - Used for Card borders and input separators in Light Mode
          textMain: "#111827", // Main Heading/Text Color - Used for primary page titles and body text in Light Mode
          textMuted: "#6B7280", // Secondary Text Color - Used for descriptions and secondary labels in Light Mode
        },
        dark: {
          primary: {
            1: "#0F172A", // Main Application Background - Used for the root page background in Dark Mode
            2: "#134CC7", // Highlighted Auth Text - Used specifically in Forget Password and Login flow titles
            3: "#1E293B", // Surface/Card Background - Used for Form containers, Card backgrounds, and Input fields in Dark Mode
            4: "#151E31", // Secondary Surface - Used for About page cards and Loading Skeleton backgrounds
          },
          secondary: "#2563ea", // Dark Mode Accent - Used for secondary brand highlights within dark surfaces
          white: "#fff", // Pure White - Used for main headings and icons in Dark Mode
          black: "#000", // Pure Black - General usage for extreme shadows or contrast
          gray: "#9CA3AF", // Dark Muted Text - Used for secondary text on dark backgrounds
        },
        light: {
          primary: "#F8FAFC", // Main Application Background - Used for the root page background in Light Mode
          secondary: "#2563ea", // Light Mode Accent - Used for primary brand highlights in light surfaces
          main: "#F0F4F8", // Section Background - Used for secondary sections, inner containers, and chips
          blue50: "#EFF6FF", // Soft Blue Surface - Used for light background sections and card highlights
          blue60: "#cddaebff", // Muted Blue Layer - Used for subtle UI overlays and input focus backgrounds
          blue100: "#DBEAFE", // Accent Highlight - Used for special border highlights and background badges
          white: "#fff", // Pure White - Used for Card, Form, and Input backgrounds in Light Mode
          black: "#000", // Pure Black - Used for primary headings and high-contrast text in Light Mode
          gray: "#9CA3AF", // Light Muted Text - Used for borders and less significant labels in Light Mode
        },
      },
    },
  },
  plugins: [],
};
