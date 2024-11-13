import eslint from "./eslint-config";
// eslint
export type {
    BaseConfig,
    JsonConfig,
    YamlConfig,
    TsConfig,
    VueCinfig,
    RulesConfig,
    EslintConfig,
} from "./eslint-config/eslint";

export {
    defineEslint,
    defineRules,
    defineTsRules,
    defineVueRules,
    defineJsoncRules,
    defineOrders,
    defineYamlRules,
    defineIgnoresRules,
} from "./eslint-config/index";

// stylelint
export type { CssConfig, ScssConfig, StylelintConfig } from "./stylelint-config/stylelint";

export { defineStyleLint, defineCssConfig, defineCssRules } from "./stylelint-config";

export default {
    eslint: eslint.configs,
}