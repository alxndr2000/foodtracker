import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
	// Base config for all files (JS/TS)
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], // plain JS/TS
		plugins: { js },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.node }, // backend/shared run in node
	},

	// Frontend files (React Native / Expo)
	{
		files: ["packages/frontend/**/*.{js,jsx,ts,tsx}"],
		plugins: { js, react: pluginReact },
		extends: ["js/recommended"],
		languageOptions: { globals: globals.browser },
		rules: {
			...pluginReact.configs.flat.recommended.rules,
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-require-imports": "off",
			"camelcase": "error",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	globalIgnores(["**/dist/**", "**/node_modules/**"]),
	// TypeScript recommended rules
	tseslint.configs.recommended,

	// Prettier should always come last
	eslintConfigPrettier,
]);
