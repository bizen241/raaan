import React, { useEffect, useState } from "react";
import { EntityId, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { useEntity } from "../hooks/useEntity";

interface BaseComponentProps<T extends EntityType> {
  entityId: EntityId<T>;
  entity: EntityTypeToEntity[T];
  onReload: () => void;
}

export const withEntity = <T extends EntityType>(entityType: T) => (
  BaseComponent: React.ComponentType<BaseComponentProps<T>>
) =>
  React.memo<{ entityId: EntityId<T> }>(({ entityId }) => {
    const { entity, onReload } = useEntity(entityType, entityId);
    const [cachedEntity, cacheEntity] = useState(entity);

    useEffect(() => entity && cacheEntity(entity), [entity]);

    if (cachedEntity === undefined) {
      return null;
    }

    return <BaseComponent entityId={entityId} entity={cachedEntity} onReload={onReload} />;
  });
