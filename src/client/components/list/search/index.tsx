import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";
import { stringifySearchParams } from "../../../api/request/search";
import { connector } from "../../../reducers";

export interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  searchParams: Partial<SearchParams<E>>;
}

export interface EntityListItemProps<E extends EntityObject> {
  entity: E;
}

export const EntityList = connector(
  (
    state,
    ownProps: {
      title?: React.ReactNode;
      entityType: EntityType;
      searchParams: Partial<SearchParams<any>>;
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
  ({ title, entityType, searchParams, itemComponent: ListItem, searchResultMap, entityMap, searchEntity }) => {
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
    const onChangePage = useCallback((_, newPage) => setPage(newPage), []);
    const onChangeRowsPerPage = useCallback(e => setLimit(parseInt(e.target.value, 10)), []);

    if (searchResult === undefined || selectedEntities === undefined) {
      return (
        <Card>
          <CardHeader avatar={<CircularProgress />} title="ロード中です" />
        </Card>
      );
    }

    return (
      <Paper>
        <Toolbar>
          <Typography variant="h6">{title || "検索結果"}</Typography>
          <Box component="span" flexGrow={1} />
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
        </Toolbar>
        <Table>
          <TableBody>
            {selectedEntities.map(entity => (
              <TableRow key={entity.id}>
                <ListItem entity={entity} />
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
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
);
