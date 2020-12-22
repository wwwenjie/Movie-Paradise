module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    extends: [
        'standard-with-typescript'
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        '@typescript-eslint/no-extraneous-class':'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/restrict-template-expressions':'off'
    }
};
