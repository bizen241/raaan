import React, { useEffect, useState } from "react";
import { EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { useEntity } from "../hooks/useEntity";

interface BaseComponentProps<E extends EntityObject> {
  entityId: string;
  entity: E;
  onReload: () => void;
}

export const withEntity = <T extends EntityType>(entityType: T) => (
  BaseComponent: React.ComponentType<BaseComponentProps<EntityTypeToEntity[T]>>
) =>
  React.memo<{ entityId: string }>(({ entityId }) => {
    const { entity, onReload } = useEntity(entityType, entityId);
    const [cachedEntity, cacheEntity] = useState(entity);

    useEffect(() => entity && cacheEntity(entity), [entity]);

    if (cachedEntity === undefined) {
      return null;
    }

    return <BaseComponent entityId={entityId} entity={cachedEntity} onReload={onReload} />;
  });
