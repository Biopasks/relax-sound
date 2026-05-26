/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'flemmatico': ['Flemmatico', 'sans-serif'],
        'mts-wide': ['MTS Wide', 'sans-serif'],
        'etude-noire': ['Etude Noire', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom colors
        'app-dark-blue': 'hsl(var(--app-dark-blue))',
        'app-light-gray': 'hsl(var(--app-light-gray))',
        'app-accent-green': 'hsl(var(--app-accent-green))',
        'app-red-lock': 'hsl(var(--app-red-lock))',
        'magic-blue-start': 'hsl(var(--magic-blue-start))',
        'magic-blue-end': 'hsl(var(--magic-blue-end))',
        'magic-accent-blue': 'hsl(var(--magic-accent-blue))',
        'magic-accent-green-dark': 'hsl(var(--magic-accent-green-dark))',
        'magic-gray-dark': 'hsl(var(--magic-gray-dark))',
        'magic-gray-light': 'hsl(var(--magic-gray-light))',
        'magic-casino-glow': 'hsl(var(--magic-casino-glow))',
        'app-global-bg-start': 'hsl(var(--app-global-bg-start))',
        'app-global-bg-end': 'hsl(var(--app-global-bg-end))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0px rgba(59, 130, 246, 0.4)" },
          "50%": { boxShadow: "0 0 15px rgba(59, 130, 246, 0.8)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "radial-pulse": {
          "0%, 100%": { "background-image": "radial-gradient(circle at center, rgba(var(--magic-gray-light-rgb), 0.1) 0%, rgba(var(--magic-gray-dark-rgb), 0.8) 70%, rgba(var(--magic-gray-dark-rgb), 1) 100%)" },
          "50%": { "background-image": "radial-gradient(circle at center, rgba(var(--magic-gray-light-rgb), 0.2) 0%, rgba(var(--magic-gray-dark-rgb), 0.7) 70%, rgba(var(--magic-gray-dark-rgb), 1) 100%)" },
        },
        "background-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "particle-burst": {
          "0%": { transform: "translate(-50%, -50%) scale(0.5)", opacity: "1" },
          "100%": { transform: "translate(-50%, -50%) scale(2)", opacity: "0" },
        },
        "cosmic-pan": {
          "0%": { backgroundPosition: "0% 0%" },
          "25%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
          "100%": { backgroundPosition: "0% 0%" }
        },
        "glow-subtle": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(var(--app-global-accent-rgb), 0.2)" },
          "50%": { boxShadow: "0 0 10px rgba(var(--app-global-accent-rgb), 0.4)" }
        },
        "border-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0px 0px rgba(var(--magic-accent-blue-rgb), 0.5)",
            borderColor: "rgba(var(--magic-accent-blue-rgb), 0.5)",
          },
          "50%": {
            boxShadow: "0 0 15px 3px rgba(var(--magic-accent-blue-rgb), 0.8)",
            borderColor: "rgba(var(--magic-accent-blue-rgb), 0.8)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "radial-pulse": "radial-pulse 4s infinite ease-in-out",
        "background-pan": "background-pan 30s ease infinite",
        "particle-burst": "particle-burst 2s ease-out forwards",
        "cosmic-pan": "cosmic-pan 60s ease-in-out infinite alternate",
        "glow-subtle": "glow-subtle 3s ease-in-out infinite alternate",
        "border-glow": "border-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};