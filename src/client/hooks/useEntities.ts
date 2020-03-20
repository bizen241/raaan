import { EntityId, EntityType } from "../../shared/api/entities";
import { useSelector } from "../reducers";

export const useEntities = <T extends EntityType>(entityType: T) => {
  const entityMap = useSelector(state => state.cache.get[entityType]);

  return {
    entityIds: Object.keys(entityMap) as EntityId<T>[],
    entityMap
  };
};
