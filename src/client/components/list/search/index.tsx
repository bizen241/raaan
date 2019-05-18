import { Callout } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";
import { stringifySearchParams } from "../../../api/request/search";
import { connector } from "../../../reducers";
import { Column } from "../../ui";
import { List } from "../List";

export interface EntityListProps<E extends EntityObject> {
  searchParams?: Partial<SearchParams<E>>;
}

export interface EntityListItemProps<E extends EntityObject> {
  entity: E;
  onDelete: (id: string) => void;
}

export const EntityList = connector(
  (
    state,
    ownProps: {
      entityType: EntityType;
      searchParams?: Partial<SearchParams<any>>;
      itemComponent: React.ComponentType<EntityListItemProps<any>>;
    }
  ) => ({
    ...ownProps,
    searchResultMap: state.cache.search[ownProps.entityType],
    entityMap: state.cache.get[ownProps.entityType]
  }),
  actions => ({
    searchEntity: actions.api.search,
    deleteEntity: actions.api.delete
  }),
  ({ entityType, searchParams, itemComponent: ListItem, searchResultMap, entityMap, searchEntity, deleteEntity }) => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const searchResult = useMemo(() => {
      const searchQuery = stringifySearchParams(
        {
          ...searchParams,
          limit,
          offset
        },
        true
      );

      return searchResultMap[searchQuery];
    }, [limit, offset]);
    const selectedEntities = useMemo(() => {
      if (searchResult === undefined) {
        return undefined;
      }

      const entities: EntityObject[] = [];
      const entityIds = searchResult.ids;
      const lastIndex = Math.min(offset + limit, searchResult.count - 1);

      for (let index = offset; index <= lastIndex; index++) {
        const entityId = entityIds[index];
        if (entityId === undefined) {
          return undefined;
        }

        const entity = entityMap[entityId];
        if (entity === undefined) {
          return undefined;
        }

        entities.push(entity);
      }

      return entities;
    }, [searchResult]);

    useEffect(() => {
      if (searchResult === undefined || selectedEntities === undefined) {
        searchEntity(entityType, {
          ...searchParams,
          limit,
          offset
        });
      }
    }, [limit, offset]);

    const onDelete = useCallback((id: string) => deleteEntity(entityType, id), []);

    if (searchResult === undefined || selectedEntities === undefined) {
      return (
        <Column padding="vertical">
          <Callout intent="primary" title="ロード中です" />
        </Column>
      );
    }

    return (
      <Column>
        <List
          limit={limit}
          offset={offset}
          count={searchResult.count}
          onChangeLimit={setLimit}
          onChangeOffset={setOffset}
          focusKey="s"
        >
          {selectedEntities.map(entity => (
            <ListItem key={entity.id} entity={entity} onDelete={onDelete} />
          ))}
        </List>
      </Column>
    );
  }
);
