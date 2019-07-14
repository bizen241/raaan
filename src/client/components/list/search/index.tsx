import {
  Avatar,
  Box,
  Button,
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
import { List, Refresh, Search } from "@material-ui/icons";
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

    if (status !== undefined && status !== 200) {
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
            <Avatar className={classes.cardAvatar}>
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
        {ParamsComponent && (
          <Box display="flex" flexDirection="column" px={1} pb={2}>
            <ParamsComponent searchParams={nextSearchParams} onChange={onChangeNextSearchParams} />
            <Button
              className={classes.largeButton}
              variant="contained"
              onClick={() => onChangeParams(nextSearchParams)}
            >
              <Search className={classes.leftIcon} />
              検索
            </Button>
          </Box>
        )}
        <Table>
          <TableBody>{entities.map(entity => entity && <ItemComponent key={entity.id} entity={entity} />)}</TableBody>
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
