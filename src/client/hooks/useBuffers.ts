import { useSelector } from "react-redux";
import { EntityType } from "../../shared/api/entities";
import { RootState } from "../reducers";

export const useBuffers = <T extends EntityType>(entityType: T) => {
  const buffers = useSelector((state: RootState) => state.buffers[entityType]);

  return buffers;
};
