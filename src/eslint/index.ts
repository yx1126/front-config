import { EslintConfig, FlatESLintConfig } from "../../types/eslint";
import defineBaseConfig, { defineRules } from "./configs/base";
import defineTsConfig, { defineTsRules } from "./configs/typescript";
import defineVueConfig, { defineVueRules } from "./configs/vue";
import defineSvelteConfig, { defineSvelteRules } from "./configs/svelte";
import defineJsonConfig, { defineJsoncRules, definePkgSort, defineTsSort } from "./configs/jsonc";
import defineYamlConfig, { defineYamlRules } from "./configs/yaml";
import defineIgnores, { defineIgnoresRules } from "./configs/ignores";
import defineStylistic from "./configs/stylistic";
import { isEnable, getConfig, mergeConfig } from "../utils";
import { isPackageExists } from "local-pkg";
export type * from "../../types/eslint";

const VuePackages = [
    "vue",
    "nuxt",
    "vitepress",
    "@slidev/cli",
];

function defineEslint(config?: EslintConfig): FlatESLintConfig[];
function defineEslint(config: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[];
function defineEslint(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[] {
    const { json, package: pkg, tsconfig, yaml, typescript, vue, svelte, stylistic: style } = config || {};
    const verifyVue = isEnable(vue, VuePackages.some(i => isPackageExists(i)));
    const verifyTs = isEnable(typescript, isPackageExists("typescript"));
    const verifySvelte = isEnable(svelte);
    const verifyJson = isEnable(json);
    const verifyYaml = isEnable(yaml);
    const verifyStyle = isEnable(style);
    // stylistic options
    const styleConfig = getConfig(style);

    // javascript
    const result: FlatESLintConfig[] = [
        ...defineBaseConfig({
            ...config?.base,
        }),
        ...defineIgnores(),
    ];
    // typescript
    if(verifyTs) {
        const tsConfig = getConfig(typescript);
        const tsFiles = [...(tsConfig?.files || [])];
        if(verifyVue) {
            tsFiles.push("**/*.vue");
        }
        result.push(...defineTsConfig({
            ...tsConfig,
            files: tsFiles,
        }));
    }
    // stylistic
    if(verifyStyle) {
        result.push(defineStylistic(styleConfig) as any);
    }
    // vue
    if(verifyVue) {
        result.push(...defineVueConfig({
            typescript: verifyTs,
            ...getConfig(vue, { indent: styleConfig.indent }),
        }));
    }
    // svelte
    if(verifySvelte) {
        result.push(...defineSvelteConfig({
            typescript: verifyTs,
            ...getConfig(svelte, { indent: styleConfig.indent }),
        }));
    }
    // jsonc
    if(verifyJson) {
        result.push(...defineJsonConfig({
            ...getConfig(json, { indent: styleConfig.indent }),
            package: pkg,
            tsconfig: verifyTs ? tsconfig ?? true : false,
        }));
    }
    // yaml
    if(verifyYaml) {
        result.push(...defineYamlConfig(getConfig(yaml, { indent: styleConfig.indent })));
    }
    result.push(...(config?.flatESLintConfig || []), ...flats);
    return result;
}

export function defineReallyx(config?: EslintConfig): FlatESLintConfig[];
export function defineReallyx(config: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[];
export function defineReallyx(config?: EslintConfig, ...flats: FlatESLintConfig[]): FlatESLintConfig[] {
    const _config: EslintConfig = mergeConfig({
        package: true,
        json: true,
        stylistic: {
            indent: 4,
        },
        yaml: {
            indent: 2,
        },
    }, config || {});
    return defineEslint(_config, ...flats);
}

export {
    defineEslint,
    // configs
    defineBaseConfig,
    defineTsConfig,
    defineVueConfig,
    defineSvelteConfig,
    defineJsonConfig,
    definePkgSort,
    defineTsSort,
    defineYamlConfig,
    defineIgnores,
    defineStylistic,
    // rules
    defineRules,
    defineTsRules,
    defineVueRules,
    defineSvelteRules,
    defineJsoncRules,
    defineYamlRules,
    defineIgnoresRules,
};

export default defineEslint;