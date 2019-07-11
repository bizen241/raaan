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

export const createEntityList = <E extends EntityObject>(
  entityType: EntityType,
  ListItem: React.ComponentType<EntityListItemProps<E>>
) =>
  React.memo<EntityListProps<E>>(({ title, initialSearchParams = {} }) => {
    const classes = useStyles();

    const { entities, status, limit, page, count, onReload, onChangePage, onChangeRowsPerPage } = useSearch(
      entityType,
      initialSearchParams
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
        <Table>
          <TableBody>{entities.map(entity => entity && <ListItem key={entity.id} entity={entity} />)}</TableBody>
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
