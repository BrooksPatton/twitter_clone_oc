import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  // Next.js recommended rules: React, hooks, accessibility, core-web-vitals
  ...nextVitals,
  // TypeScript recommended rules (@typescript-eslint v8, includes no-explicit-any: error)
  ...nextTs,
  // Type-aware rules — requires TypeScript language service via parserOptions.project
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.mts"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Explicitly keep no-any as error (documented requirement)
      "@typescript-eslint/no-explicit-any": "error",
      // Type-aware rules that require parserOptions.project
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
  // Disable ESLint style rules that conflict with Prettier (must be last)
  prettierConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
