
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				game: {
					'gradient-from': '#6366F1',
					'gradient-to': '#A78BFA',
					'win': '#00FF6A',
					'lose': '#FF3A5E',
					'draw': '#00FFF0',
					'neon-cyan': '#00FFF0',
					'neon-pink': '#FF00F0',
					'neon-green': '#00FF6A'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'shake': {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'25%': { transform: 'rotate(-5deg)' },
					'50%': { transform: 'rotate(5deg)' },
					'75%': { transform: 'rotate(-5deg)' }
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'70%': { transform: 'scale(1.1)', opacity: '1' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'spin-in': {
					'0%': { transform: 'rotate(0deg) scale(0.5)', opacity: '0' },
					'100%': { transform: 'rotate(720deg) scale(1)', opacity: '1' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 10px currentColor' },
					'50%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
				},
				'text-glow': {
					'0%, 100%': { textShadow: '0 0 10px currentColor' },
					'50%': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'shake': 'shake 0.5s ease-in-out',
				'bounce-in': 'bounce-in 0.5s ease-out',
				'spin-in': 'spin-in 0.8s ease-out',
				'glow': 'glow 2s ease-in-out infinite',
				'text-glow': 'text-glow 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
