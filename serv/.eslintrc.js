module.exports = {
  ...require("@blitzjs/next/eslint"),
  plugins: ["formatjs"],
  rules: {
    "formatjs/no-offset": "error",
    "formatjs/enforce-id": [
      "error",
      {
        idInterpolationPattern: "[sha512:contenthash:base64:6]",
      },
    ],
  },
}
