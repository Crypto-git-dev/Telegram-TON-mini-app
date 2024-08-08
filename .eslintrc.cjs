module.exports = {
    env : {
        browser : true,
        es2021 : true,
    },
    extends : [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser : '@typescript-eslint/parser',
    parserOptions : {
        ecmaFeatures : {
            jsx : true,
        },
        ecmaVersion : 'latest',
        sourceType : 'module',
    },
    plugins : [
        'react',
        '@typescript-eslint',
    ],
    rules : {
        'react/prop-types' : 'off', // Отключить проверку типов пропсов
        '@typescript-eslint/explicit-module-boundary-types' : 'off', // Отключить проверку типов для TypeScript
    },
    settings : {
        react : {
            version : 'detect',
        },
    },
};
