import * as React from "react";
import { useEffect, useState } from "react";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { useEntity } from "../hooks/entity";

interface Params {
  entityType: EntityType;
}

interface Props<E extends EntityObject> {
  entityId: string;
  entity: E;
}

export const withEntity = <E extends EntityObject, P extends {} = {}>(params: Params) => (
  BaseComponent: React.ComponentType<Props<E> & P>
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
