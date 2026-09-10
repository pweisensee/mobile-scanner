const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    globalIgnores(['.expo/*', 'android/*', 'dist/*', 'ios/*']),
    expoConfig,
]);
