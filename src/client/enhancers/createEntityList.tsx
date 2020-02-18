import { Card, CircularProgress, Divider, TableCell, TableRow } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React, { useCallback } from "react";
import { EntityId, EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { Column, IconButton, Row, Table, TablePagination } from "../components/ui";
import { useSearch } from "../hooks/useSearch";

interface EntityListOptions {
  itemHeight?: number;
}

interface EntityListProps<E extends EntityObject> {
  title?: React.ReactNode;
  onReload?: () => void;
  initialParams: Params<E>;
}

interface EntityListItemProps<T extends EntityType> {
  entityId: EntityId<T>;
  entity: EntityTypeToEntity[T];
  params: Params<EntityTypeToEntity[T]>;
  onReload: () => void;
}

interface EntityListParamsProps<E extends EntityObject> {
  params: Params<E>;
  onReload: () => void;
  onChange: (params: Params<E>) => void;
}

export const createEntityList = <T extends EntityType>(entityType: T, options: EntityListOptions = {}) => (
  ItemComponent: React.ComponentType<EntityListItemProps<T>>,
  ParamsComponent?: React.ComponentType<EntityListParamsProps<EntityTypeToEntity[T]>>
) =>
  React.memo<EntityListProps<EntityTypeToEntity[T]>>(({ initialParams, ...props }) => {
    const { itemHeight = 53 } = options;

    const { entityIds, entityMap, params, status, limit, offset, count, onChange, ...searchProps } = useSearch<T>(
      entityType,
      initialParams
    );

    const isLoading = status !== undefined && status !== 200;
    const emptyRows = !isLoading && limit - entityIds.length;

    const onReload = () => {
      if (props.onReload !== undefined) {
        props.onReload();
      }
      searchProps.onReload();
    };

    return (
      <Column pb={1}>
        <Card>
          <Column px={2} py={1}>
            {ParamsComponent === undefined ? (
              <Row>
                <Row flex={1} />
                <IconButton icon={Refresh} onClick={onReload} />
              </Row>
            ) : (
              <ParamsComponent params={params} onReload={onReload} onChange={onChange} />
            )}
          </Column>
          <Divider />
          <Table>
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
              entityIds.map(entityId => {
                const entity = entityMap[entityId];
                if (entity === undefined) {
                  return null;
                }

                return (
                  <ItemComponent
                    key={entityId}
                    entityId={entityId}
                    entity={entity as EntityTypeToEntity[T]}
                    params={params}
                    onReload={onReload}
                  />
                );
              })}
            {emptyRows && (
              <TableRow style={{ height: itemHeight * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
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
