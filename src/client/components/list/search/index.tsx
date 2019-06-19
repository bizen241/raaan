import {
  Avatar,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { List, Refresh } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";
import { useSearch } from "../../../hooks/search";
import { actions } from "../../../reducers";

export interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  searchParams: Partial<SearchParams<E>>;
}

export interface EntityListItemProps<E extends EntityObject> {
  entity: E;
}

export const EntityList = React.memo<{
  title?: React.ReactNode;
  entityType: EntityType;
  searchParams: Partial<SearchParams<any>>;
  itemComponent: React.ComponentType<EntityListItemProps<any>>;
}>(({ title, entityType, searchParams: partialSearchParams, itemComponent: ListItem }) => {
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const offset = limit * page;

  const searchParams = useMemo(
    () => ({
      ...partialSearchParams,
      limit,
      offset
    }),
    [partialSearchParams, limit, offset]
  );

  const { searchResult, selectedEntities } = useSearch(entityType, searchParams);

  const onReload = useCallback(() => dispatch(actions.api.search(entityType, searchParams)), [searchParams]);
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
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <List />
          </Avatar>
        }
        title={title || "検索結果"}
        titleTypographyProps={{ variant: "h6" }}
        action={
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
        }
      />
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
    </Card>
  );
});
