import { AuthParams } from "..";

export type AuthStrategyCallback = (err: any, params?: AuthParams) => void;
