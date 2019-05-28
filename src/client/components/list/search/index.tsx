import { Callout } from "@blueprintjs/core";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as React from "react";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";
import { stringifySearchParams } from "../../../api/request/search";
import { connector } from "../../../reducers";
import { Column } from "../../ui";

export interface EntityListProps<E extends EntityObject> {
  searchParams?: Partial<SearchParams<E>>;
}

export interface EntityListItemProps<E extends EntityObject> {
  entity: E;
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
    searchEntity: actions.api.search
  }),
  ({ entityType, searchParams, itemComponent: ListItem, searchResultMap, entityMap, searchEntity }) => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const offset = limit * page;

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
    }, [searchResultMap, searchParams, limit, offset]);
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
    }, [searchParams, limit, offset]);

    const onReload = useCallback(
      () =>
        searchEntity(entityType, {
          ...searchParams,
          limit,
          offset
        }),
      [searchParams, limit, offset]
    );

    if (searchResult === undefined || selectedEntities === undefined) {
      return (
        <Column padding="vertical">
          <Callout intent="primary" title="ロード中です" />
        </Column>
      );
    }

    return (
      <Paper>
        <Toolbar>
          <Typography variant="h6">保存済み</Typography>
          <Box component="span" flexGrow={1} />
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
        </Toolbar>
        <Table>
          <TableBody>
            {selectedEntities.map(entity => (
              <TableRow key={entity.id}>
                <TableCell>
                  <ListItem entity={entity} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={limit}
                page={page}
                count={searchResult.count}
                labelRowsPerPage="表示件数:"
                onChangePage={useCallback((_, newPage) => setPage(newPage), [])}
                onChangeRowsPerPage={useCallback(e => setLimit(parseInt(e.target.value, 10)), [])}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
);
