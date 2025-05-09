/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');
function generateOpacityVariants(baseColor) {
  const variants = {};
  const opacityValues = [0.5, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  opacityValues.forEach((value) => {
    variants[value] = `hsla(var(--${baseColor}), 0.${value})`;
  });
  return variants;
}
module.exports = {
  darkMode: 'class',
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        effect: {
          DEFAULT: 'hsla(var(--ring),0.05)',
          sm: 'hsla(var(--ring),0.02)',
          md: 'hsla(var(--ring),0.1)',
          lg: 'hsla(var(--ring),0.15)',
          xl: 'hsla(var(--ring),0.20)',
          '2xl': 'hsla(var(--ring),0.25)',
        },
        background: {
          DEFAULT: 'hsl(var(--background))',
          ...generateOpacityVariants('background'),
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          ...generateOpacityVariants('foreground'),
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ...generateOpacityVariants('primary'),
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          ...generateOpacityVariants('accent'),
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      textShadow: {
        DEFAULT: '0 1px 2px hsl(var(--shadow),0.2)',
        md: '0 2px 4px hsl(var(--ring))',
        lg: '0 4px 8px  hsl(var(--ring))',
        xl: '0 8px 16px  hsl(var(--ring))',
      },
      zIndex: {
        selection: 'var(--selection)',
        popOver: 'var(--popOver)',
        navbar: 'var(--navbar)',
        sidebar: 'var(--sidebar)',
        drawer: 'var(--drawer)',
        modal: 'var(--modal)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      }),
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};
