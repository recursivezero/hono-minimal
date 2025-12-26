import antfu from "@antfu/eslint-config";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double"
    },
    ignores: [
      "**/node_modules/*",
      " dist/",
      ".github",
      "/src/assets/**",
      "**/*.md",
      "**/.cache",
      "dist",
      "/src/mocks/**"
    ],
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-json files
    files: ["**/*.json"],
    rules: {
      "jsonc/indent": ["error", 2],
      "jsonc/sort-keys": "off"
    }
  },
  {
    rules: {
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["off"],
      "perfectionist/sort-imports": [
        "off",
        {
          internalPattern: ["@/**"]
        }
      ],
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true
          },
          ignore: ["README.md"]
        }
      ],
      "style/comma-dangle": ["off"],
      "style/arrow-parens": ["off"],
      "style/semi": ["warn"],
      "style/indent": ["off"],
      "import/newline-after-import": ["warn"],
      "antfu/if-newline": ["warn"],
      "style/no-multiple-empty-lines": ["warn"],
      "unused-imports/no-unused-vars": ["warn"],
      "style/eol-last": ["off"],
      "style/jsx-curly-spacing": ["off"],
      "style/brace-style": ["off"],
      "style/spaced-comment": ["off"],
      "style/no-trailing-spaces": ["warn"],
      "style/object-curly-spacing": ["warn"],
      "perfectionist/sort-named-exports": ["off"],
      "no-template-curly-in-string": ["off"],
      "antfu/consistent-list-newline": ["off"],
      "antfu/top-level-function": ["off"],
      "ts/no-empty-function": "error",
      "ts/no-empty-interface": "error",
      "ts/no-explicit-any": ["warn"],
      "ts/no-non-null-assertion": ["warn"],
      "ts/no-unsafe-declaration-merging": ["off"]
    }
  }
);
