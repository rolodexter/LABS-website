module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    // Custom rule to enforce correct prop typing for SVG attributes
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // Add a custom rule to warn about string literals in numeric props
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'JSXAttribute[name.name="strokeWidth"][value.type="Literal"][value.value=/^\\d+$/]',
        message: 'Use numeric prop with curly braces for strokeWidth, e.g. strokeWidth={2}',
      },
    ],
  },
};
