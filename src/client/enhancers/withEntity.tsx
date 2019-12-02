import * as React from "react";
import { useEffect, useState } from "react";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { useEntity } from "../hooks/useEntity";

interface WithEntityParams {
  entityType: EntityType;
}

interface BaseComponentProps<E extends EntityObject> {
  entityId: string;
  entity: E;
}

export const withEntity = <E extends EntityObject, P extends {} = {}>(params: WithEntityParams) => (
  BaseComponent: React.ComponentType<BaseComponentProps<E> & P>
) =>
  React.memo<{ entityId: string } & P>(({ entityId, ...props }) => {
    const { entityType } = params;

    const { entity } = useEntity<E>(entityType, entityId);
    const [cachedEntity, cacheEntity] = useState(entity);

    useEffect(() => entity && cacheEntity(entity), [entity]);

    if (cachedEntity === undefined) {
      return null;
    }

    return <BaseComponent entityId={entityId} entity={cachedEntity} {...props as P} />;
  });
