/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        petal: "#FFF4EA",
        cream: "#FEF9F4",
        blush: "#F7D9D9",
        mist: "#EFE8F0",
        sage: "#C8D8C0",
        powder: "#D4E4F0",
        lavender: "#E4D8F0",
        butter: "#F5EDCA",
        coral: "#F2B8A0",
        soft: {
          pink: "#F4C2C2",
          blue: "#B8D4E8",
          green: "#B8D4B8",
          yellow: "#F0E4A8",
          purple: "#D4C0E8",
          peach: "#F4C8A8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "blob": "blob 8s ease-in-out infinite",
        "blob-reverse": "blob 10s ease-in-out infinite reverse",
        "spin-slow": "spin 12s linear infinite",
        "grain": "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0px) scale(1)" },
          "50%": { transform: "translateY(-8px) scale(1.02)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(0.97)" },
        },
        blob: {
          "0%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(3%,1%)" },
          "30%": { transform: "translate(-1%,2%)" },
          "40%": { transform: "translate(2%,-1%)" },
          "50%": { transform: "translate(-3%,3%)" },
          "60%": { transform: "translate(1%,-2%)" },
          "70%": { transform: "translate(-2%,1%)" },
          "80%": { transform: "translate(3%,-3%)" },
          "90%": { transform: "translate(-1%,2%)" },
        },
      },
      backgroundImage: {
        "mist-gradient": "radial-gradient(ellipse at 20% 20%, rgba(247,217,217,0.6) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(212,228,240,0.6) 0%, transparent 50%), radial-gradient(ellipse at 60% 40%, rgba(228,216,240,0.4) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
