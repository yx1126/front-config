import type { Config } from "stylelint";
import type { Enable } from "../types";

export type ConfigOverride = Required<Config>["overrides"];

export interface BaseConfig {
    files?: ConfigOverride[number]["files"];
    rules?: Config["rules"];
}

export interface CssConfig extends BaseConfig { }

export interface ScssConfig extends BaseConfig { }

export interface StylelintConfig extends Config {
    css?: Enable<CssConfig> | boolean;
    scss?: Enable<ScssConfig> | boolean;
}
