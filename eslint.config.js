// @ts-check
import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import vitest from "eslint-plugin-vitest";

// Configurations extracted from
// https://github.com/veritem/eslint-plugin-vitest#readme

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["tests/**"],
    plugins: {
      vitest,
      "@typescript-eslint": tseslint.plugin,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    languageOptions: {
      globals: globals.node,
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      ...vitest.configs.recommended.rules, // you can also use vitest.configs.all.rules to enable all rules
      "vitest/max-nested-describe": ["error", { max: 3 }], // you can also modify rules' behavior using option like this
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "error",
      "no-unused-vars": ["off", { argsIgnorePattern: "next" }],

      "no-console": "off",
      "import/no-extraneous-dependencies": [
        "off",
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "max-len": ["off"],
      "import/no-dinamic-require": ["off"],
      "prefer-destructuring": ["off"],
      "prefer-object-spread": ["off"],
      quotes: [
        "error",
        "single",
        { avoidEscape: true, allowTemplateLiterals: false },
      ],
      ignores: ["warn", "**/*.js", "**/dist/**", "node_modules"],
      indent: ["error", 2],
    },
  }
);
