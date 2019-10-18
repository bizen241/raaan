import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { Column, Row } from "../components/ui";
import { useSearch } from "../hooks/useSearch";

interface EntityListParams {
  entityType: EntityType;
  itemHeight?: number;
}

interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  elevation?: number;
  initialParams: Params<E>;
}

interface EntityListItemProps<E extends EntityObject> {
  entity: E;
}

interface EntityListParamsProps<E extends EntityObject> {
  params: Params<E>;
  onReload: () => void;
  onChange: (params: Params<E>) => void;
}

export const createEntityList = <E extends EntityObject>({ entityType, itemHeight = 53 }: EntityListParams) => (
  ItemComponent: React.ComponentType<EntityListItemProps<E>>,
  ParamsComponent?: React.ComponentType<EntityListParamsProps<E>>
) =>
  React.memo<EntityListProps<E>>(({ elevation, initialParams }) => {
    const { entities, params, status, limit, offset, count, onReload, onChange } = useSearch(entityType, initialParams);

    const isLoading = status !== undefined && status !== 200;
    const emptyRows = !isLoading && limit - entities.length;

    return (
      <Card elevation={elevation}>
        <CardContent>
          <Column>
            {ParamsComponent === undefined ? (
              <Row>
                <IconButton onClick={onReload}>
                  <Refresh />
                </IconButton>
              </Row>
            ) : (
              <ParamsComponent params={params} onReload={onReload} onChange={onChange} />
            )}
          </Column>
        </CardContent>
        <Divider />
        <Table>
          <TableBody>
            {isLoading && (
              <TableRow style={{ height: itemHeight * limit }}>
                <TableCell>
                  <Row alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Row>
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
                      searchOffset: page * limit
                    } as Params<E>),
                  [limit]
                )}
                onChangeRowsPerPage={useCallback(
                  (e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({
                      searchLimit: parseInt(e.target.value, 10)
                    } as Params<E>),
                  []
                )}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    );
  });
