import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(68, 177, 255, 0.22)",
        "glass-inset": "inset 0 1px 0 rgba(255,255,255,0.18)"
      },
      fontFamily: {
        sans: [
          "InterVariable",
          "Inter",
          "SF Pro Display",
          "SF Pro Text",
          "Segoe UI",
          "system-ui",
          "sans-serif"
        ],
        mono: ["SFMono-Regular", "Cascadia Code", "Consolas", "monospace"]
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" }
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-1%, 1%)" },
          "50%": { transform: "translate(1%, -1%)" },
          "75%": { transform: "translate(-1%, -1%)" }
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" }
        },
        glowBreathe: {
          "0%, 100%": { filter: "brightness(1) drop-shadow(0 0 6px currentColor)" },
          "50%": { filter: "brightness(1.3) drop-shadow(0 0 18px currentColor)" }
        },
        floatOrbit: {
          "0%": { transform: "rotate(0deg) translateX(4px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(4px) rotate(-360deg)" }
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" }
        },
        typeChar: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        flipIn: {
          "0%": { transform: "rotateY(90deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" }
        }
      },
      animation: {
        shimmer: "shimmer 2.8s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        grain: "grain 9s steps(4) infinite",
        "text-shimmer": "textShimmer 4s linear infinite",
        "glow-breathe": "glowBreathe 3s ease-in-out infinite",
        "float-orbit": "floatOrbit 12s linear infinite",
        "scan-line": "scanLine 3.5s ease-in-out infinite",
        "type-char": "typeChar 0.3s ease-out forwards",
        "flip-in": "flipIn 0.6s ease-out forwards"
      },
      borderRadius: {
        glass: "8px"
      },
      screens: {
        xs: "420px"
      }
    }
  },
  plugins: []
};

export default config;
