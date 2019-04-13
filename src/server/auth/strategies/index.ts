import { UserEntity } from "../../database/entities";

export type AuthStrategyCallback = (err: any, user?: UserEntity) => void;
