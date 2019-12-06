import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { Column, Row, TablePagination } from "../components/ui";
import { useSearch } from "../hooks/useSearch";

interface EntityListOptions {
  itemHeight?: number;
}

interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  onReload?: () => void;
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

export const createEntityList = <T extends EntityType>(entityType: T, options: EntityListOptions = {}) => (
  ItemComponent: React.ComponentType<EntityListItemProps<EntityTypeToEntity[T]>>,
  ParamsComponent?: React.ComponentType<EntityListParamsProps<EntityTypeToEntity[T]>>
) =>
  React.memo<EntityListProps<EntityTypeToEntity[T]>>(({ initialParams, ...props }) => {
    const { itemHeight = 53 } = options;

    const { entities, params, status, limit, offset, count, onChange, ...searchProps } = useSearch(
      entityType,
      initialParams
    );

    const isLoading = status !== undefined && status !== 200;
    const emptyRows = !isLoading && limit - entities.length;

    const onReload = () => {
      if (props.onReload !== undefined) {
        props.onReload();
      }
      searchProps.onReload();
    };

    return (
      <Column pb={1}>
        <Card>
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
              {!isLoading &&
                entities.map(
                  entity => entity && <ItemComponent key={entity.id} entity={entity as EntityTypeToEntity[T]} />
                )}
              {emptyRows && (
                <TableRow style={{ height: itemHeight * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Column p={2}>
            <TablePagination
              rowsPerPage={limit}
              page={offset / limit}
              count={count}
              onChangePage={useCallback(
                (page: number) =>
                  onChange({
                    searchOffset: page * limit
                  } as Params<EntityTypeToEntity[T]>),
                [limit]
              )}
              onChangeRowsPerPage={useCallback(
                (rowsPerPage: number) =>
                  onChange({
                    searchLimit: rowsPerPage
                  } as Params<EntityTypeToEntity[T]>),
                []
              )}
            />
          </Column>
        </Card>
      </Column>
    );
  });
