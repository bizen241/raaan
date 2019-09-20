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
import { useCallback } from "react";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { SearchParams } from "../../shared/api/request/search";
import { useStyles } from "../components/ui/styles";
import { useSearch } from "../hooks/search";

interface EntityListParams {
  entityType: EntityType;
  itemHeight?: number;
}

interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  elevation?: number;
  initialSearchParams?: SearchParams<E>;
}

interface EntityListItemProps<E extends EntityObject> {
  entity: E;
}

interface EntityListParamsProps<E extends EntityObject> {
  params: SearchParams<E>;
  onChange: (params: SearchParams<E>) => void;
}

export const createEntityList = <E extends EntityObject>({ entityType, itemHeight = 53 }: EntityListParams) => (
  ItemComponent: React.ComponentType<EntityListItemProps<E>>,
  ParamsComponent?: React.ComponentType<EntityListParamsProps<E>>
) =>
  React.memo<EntityListProps<E>>(({ title, elevation, initialSearchParams = {} }) => {
    const classes = useStyles();

    const { entities, params, status, limit, offset, count, onReload, onChange } = useSearch<E>(
      entityType,
      initialSearchParams
    );

    const isLoading = status !== undefined && status !== 200;
    const emptyRows = !isLoading && limit - entities.length;

    return (
      <Card elevation={elevation}>
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
              <ParamsComponent params={params} onChange={onChange} />
            </Box>
          </CardContent>
        )}
        <Divider />
        <Table>
          <TableBody>
            {isLoading && (
              <TableRow style={{ height: itemHeight * limit }}>
                <TableCell>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {!isLoading && entities.map(entity => entity && <ItemComponent key={entity.id} entity={entity as E} />)}
            {emptyRows && (
              <TableRow style={{ height: itemHeight * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={limit}
                page={offset / limit}
                count={count}
                labelRowsPerPage="表示件数:"
                onChangePage={useCallback(
                  (_, page) =>
                    onChange({
                      offset: page * limit
                    } as SearchParams<E>),
                  [limit]
                )}
                onChangeRowsPerPage={useCallback(
                  (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({
                      limit: parseInt(e.target.value, 10)
                    } as SearchParams<E>),
                  []
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    );
  });
