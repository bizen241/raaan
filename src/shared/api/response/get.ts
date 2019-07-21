import { EntityObject, EntityTypeToEntity } from "../entities";

interface EntityMap<E extends EntityObject> {
  [id: string]: E | undefined;
}

export type EntityStore = { [P in keyof EntityTypeToEntity]: EntityMap<EntityTypeToEntity[P]> };
