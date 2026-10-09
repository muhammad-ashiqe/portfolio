import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "dist-ssr", "test-results", "playwright-report"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: [
      "src/forged/three/Scene.jsx",
      "src/Components/overhaul/GlobalCanvas.jsx",
    ],
    // These are Three.js renderer properties, not DOM attributes.
    rules: {
      "react/no-unknown-property": [
        "error",
        {
          ignore: [
            "rotation",
            "position",
            "args",
            "attach",
            "intensity",
            "metalness",
            "roughness",
            "transparent",
            "wireframe",
          ],
        },
      ],
    },
  },
  {
    files: ["scripts/**/*.js", "tests/**/*.js", "playwright.config.js"],
    languageOptions: { globals: globals.node },
  },
];
