module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "semi": [ 2, "never" ],
    "no-console": "off",
    "no-empty": "off",
    "vue/max-attributes-per-line": "off",
    "vue/require-default-prop": "off",
    "prettier/prettier": [
      "error",
      {
        "arrowParens": "always",
        "bracketSpacing": true,
        "printWidth": 100,
        "semi": false,
        "singleQuote": true
      }
    ]
  }
}
