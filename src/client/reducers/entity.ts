import uuid from "uuid/v1";
import { EntityId, EntityType } from "../../shared/api/entities";

export const generateLocalEntityId = <T extends EntityType>() => uuid() as EntityId<T>;

export const isLocalEntityId = <T extends EntityType>(entityId: EntityId<T>) => entityId[14] === "1";
