import eslint from "./eslint-config"
// eslint
export type {
    BaseConfig,
    JsonConfig,
    YamlConfig,
    TsConfig,
    VueConfig,
    RulesConfig,
    EslintConfig,
} from "./eslint-config/eslint"

export * from "./eslint-config"

// stylelint
export type { CssConfig, ScssConfig, StylelintConfig } from "./stylelint-config/stylelint"

export { defineStyleLint, defineCssConfig, defineCssRules } from "./stylelint-config"

export default {
    eslint: eslint.configs,
}