import * as React from "react";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { useSearch } from "../hooks/useSearch";

interface WithSearchParams {
  entityType: EntityType;
}

interface BaseComponentProps<E extends EntityObject> {
  entities: E[];
}

export const withSearch = <E extends EntityObject, P extends {} = {}>({ entityType }: WithSearchParams) => (
  BaseComponent: React.ComponentType<BaseComponentProps<E> & P>
) =>
  React.memo<{ params: Params<E> } & P>(({ params, ...props }) => {
    const { entities } = useSearch<E>(entityType, params);

    if (entities === undefined) {
      return null;
    }

    return <BaseComponent entities={entities} {...props as P} />;
  });
