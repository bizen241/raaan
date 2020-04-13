import { useSelector } from "react-redux";
import { EntityId, EntityType } from "../../shared/api/entities";
import { RootState } from "../reducers";

export const useBuffers = <T extends EntityType>(entityType: T) => {
  const bufferMap = useSelector((state: RootState) => state.buffers[entityType]);

  return {
    bufferIds: Object.keys(bufferMap) as EntityId<T>[],
    bufferMap,
  };
};
