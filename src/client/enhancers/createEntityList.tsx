import { Card, Divider, TableCell, TableRow } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import React, { useCallback, useEffect } from "react";
import { EntityId, EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { EntityError, FetchErrorBoundary, SearchError } from "../components/boundaries/FetchErrorBoundary";
import { Column, IconButton, Row, Table, TablePagination } from "../components/ui";
import { useSearch } from "../hooks/useSearch";

interface EntityListOptions {
  itemHeight?: number;
}

interface EntityListProps<E extends EntityObject> {
  onReload?: () => void;
  initialParams: Params<E>;
}

interface EntityListItemProps<T extends EntityType> {
  entityId: EntityId<T>;
  entity: EntityTypeToEntity[T];
  params: Params<EntityTypeToEntity[T]>;
}

interface EntityListParamsProps<E extends EntityObject> {
  params: Params<E>;
  onReload: () => void;
  onChange: (params: Params<E>) => void;
}

export const createEntityList = <T extends EntityType, P extends {}>(
  entityType: T,
  options: EntityListOptions = {}
) => (
  ItemComponent: React.ComponentType<EntityListItemProps<T> & P>,
  ParamsComponent?: React.ComponentType<EntityListParamsProps<EntityTypeToEntity[T]>>
) =>
  React.memo<EntityListProps<EntityTypeToEntity[T]> & P>(({ initialParams, onReload: reloadParent, ...props }) => {
    const { params, limit, offset, count, onChange, onChangeOffset, onChangeLimit, onReload: reloadList } = useSearch(
      entityType,
      initialParams
    );

    const onReloadList = () => {
      if (reloadParent !== undefined) {
        reloadParent();
      }

      reloadList();
    };

    return (
      <Column pb={1}>
        <Card>
          <Column px={2} py={1}>
            {ParamsComponent === undefined ? (
              <Row>
                <Row flex={1} />
                <IconButton icon={Refresh} onClick={onReloadList} />
              </Row>
            ) : (
              <ParamsComponent params={params} onReload={onReloadList} onChange={onChange} />
            )}
          </Column>
          <Divider />
          <Table>
            <FetchErrorBoundary>
              <EntityListItemsRenderer
                entityType={entityType}
                params={params}
                component={ItemComponent}
                additionalProps={props}
                options={options}
              />
            </FetchErrorBoundary>
          </Table>
          <Column p={2}>
            <TablePagination
              rowsPerPage={limit}
              page={offset / limit}
              count={count}
              onChangePage={useCallback((page: number) => onChangeOffset(page * limit), [limit])}
              onChangeRowsPerPage={useCallback((rowsPerPage: number) => onChangeLimit(rowsPerPage), [])}
            />
          </Column>
        </Card>
      </Column>
    );
  });

interface EntityListItemsRendererProps<T extends EntityType, P extends {}> {
  entityType: T;
  params: Params<EntityTypeToEntity[T]>;
  component: React.ComponentType<EntityListItemProps<T> & P>;
  additionalProps: any;
  options: EntityListOptions;
}

const EntityListItemsRenderer = <T extends EntityType, P extends {}>({
  entityType,
  params,
  component: Renderer,
  additionalProps,
  options
}: EntityListItemsRendererProps<T, P>) => {
  const { entities, limit, onChange } = useSearch<T>(entityType, params);

  useEffect(() => onChange(params), [params]);

  const itemHeight = options.itemHeight || 53;
  const emptyRows = limit - entities.length;

  return (
    <>
      <EntityListItemErrorConverter entityType={entityType} params={params}>
        {entities.map(entity => {
          if (entity === undefined) {
            return null;
          }

          return <Renderer key={entity.id} entityId={entity.id} entity={entity} params={params} {...additionalProps} />;
        })}
      </EntityListItemErrorConverter>
      {emptyRows !== 0 && (
        <TableRow style={{ height: itemHeight * emptyRows }}>
          <TableCell colSpan={3} />
        </TableRow>
      )}
    </>
  );
};

interface EntityListItemErrorConverterProps<T extends EntityType> {
  entityType: T;
  params: Params<EntityTypeToEntity[T]>;
}

interface EntityListItemErrorConverterState {
  error: Error | undefined;
}

class EntityListItemErrorConverter<T extends EntityType> extends React.Component<
  EntityListItemErrorConverterProps<T>,
  EntityListItemErrorConverterState
> {
  static getDerivedStateFromError(error: Error): EntityListItemErrorConverterState {
    return {
      error
    };
  }

  constructor(props: EntityListItemErrorConverterProps<T>) {
    super(props);

    this.state = { error: undefined };
  }

  onCancel = () => {
    this.setState({ error: undefined });
  };

  render() {
    const { error } = this.state;
    if (error === undefined) {
      return this.props.children;
    }
    if (error instanceof EntityError || error instanceof SearchError) {
      throw new SearchError(this.props.entityType, this.props.params);
    }

    throw error;
  }
}
