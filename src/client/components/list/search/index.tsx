import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Typography
} from "@material-ui/core";
import { List, Refresh } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { SearchParams } from "../../../../shared/api/request/search";
import { useSearch } from "../../../hooks/search";
import { useStyles } from "../../ui/styles";

interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  initialSearchParams?: Partial<SearchParams<E>>;
}

interface EntityListItemProps<E extends EntityObject> {
  entity: E;
}

interface EntityListParamsProps<E extends EntityObject> {
  searchParams: Partial<SearchParams<E>>;
  onChange: (params: Partial<SearchParams<E>>) => void;
}

export const createEntityList = <E extends EntityObject>(
  entityType: EntityType,
  ItemComponent: React.ComponentType<EntityListItemProps<E>>,
  ParamsComponent?: React.ComponentType<EntityListParamsProps<E>>
) =>
  React.memo<EntityListProps<E>>(({ title, initialSearchParams = {} }) => {
    const classes = useStyles();

    const {
      entities,
      // params: currentSearchParams,
      status,
      limit,
      page,
      count,
      onReload,
      onChangeParams,
      onChangePage,
      onChangeRowsPerPage
    } = useSearch(entityType, initialSearchParams);

    const [nextSearchParams, setNextSearchParams] = useState(initialSearchParams);
    const onChangeNextSearchParams = useCallback(
      (params: Partial<SearchParams<E>>) => setNextSearchParams(s => ({ ...s, ...params })),
      []
    );

    const isLoading = status !== undefined && status !== 200;
    const emptyRows = !isLoading && limit - entities.length;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <List />
            </Avatar>
          }
          title={<Typography>{title || "検索結果"}</Typography>}
          action={
            <IconButton onClick={onReload}>
              <Refresh />
            </IconButton>
          }
        />
        {ParamsComponent && (
          <CardContent>
            <Box display="flex" flexDirection="column">
              <ParamsComponent searchParams={nextSearchParams} onChange={onChangeNextSearchParams} />
            </Box>
          </CardContent>
        )}
        <Divider />
        <Table>
          <TableBody>
            {isLoading && (
              <TableRow style={{ height: 49 * limit }}>
                <TableCell>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && entities.map(entity => entity && <ItemComponent key={entity.id} entity={entity as E} />)}
            {emptyRows && (
              <TableRow style={{ height: 49 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={limit}
                page={page}
                count={count}
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
