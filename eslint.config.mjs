import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "lib/generated/**/*",
      "prisma/generated/**/*",
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**"
    ]
  },
  {
    rules: {
      // Allow empty object types in generated files or specific contexts
      "@typescript-eslint/no-empty-object-type": "off",
      // Allow any types in generated files or when necessary for flexibility
      "@typescript-eslint/no-explicit-any": "warn",
    }
  }
];

export default eslintConfig;
