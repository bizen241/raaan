import { EntityTypeToEntity } from "../entities";

export type EntityTypeToParams = { [P in keyof EntityTypeToEntity]: Partial<EntityTypeToEntity[P]> };
