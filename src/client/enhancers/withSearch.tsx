import React from "react";
import { EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { useSearch } from "../hooks/useSearch";

interface BaseComponentProps<E extends EntityObject> {
  entities: E[];
  params: Params<E>;
}

export const withSearch = <T extends EntityType>(entityType: T) => (
  BaseComponent: React.ComponentType<BaseComponentProps<EntityTypeToEntity[T]>>
) =>
  React.memo<{ params: Params<EntityTypeToEntity[T]> }>(({ params }) => {
    const { entities } = useSearch(entityType, params);

    if (entities === undefined) {
      return null;
    }

    return <BaseComponent entities={entities} params={params} />;
  });
