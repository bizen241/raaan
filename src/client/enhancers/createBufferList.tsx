import { Card, TableCell, TableRow } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { EntityId, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { Column, Table, TablePagination } from "../components/ui";
import { useSelector } from "../reducers";
import { getBuffer } from "../reducers/buffers";
import { getEntity } from "../reducers/cache";

interface BufferListProps {
  title?: React.ReactNode;
}

interface BufferListItemProps<T extends EntityType> {
  bufferType: T;
  bufferId: EntityId<T>;
  buffer: Params<EntityTypeToEntity[T]>;
  source: EntityTypeToEntity[T] | undefined;
  params: Params<EntityTypeToEntity[T]>;
}

export const createBufferList = <T extends EntityType>(entityType: T) => (
  ListItem: React.ComponentType<BufferListItemProps<T>>
) =>
  React.memo<BufferListProps>(() => {
    const bufferMap = useSelector((state) => state.buffers[entityType]);
    const entityMap = useSelector((state) => state.cache.get[entityType]);

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const bufferIds = Object.keys(bufferMap) as EntityId<T>[];
    const emptyRows = limit - bufferIds.length;

    return (
      <Column pb={1}>
        <Card>
          <Table>
            {bufferIds.slice(offset, offset + limit).map((bufferId) => {
              const buffer = getBuffer(bufferMap, bufferId);
              const source = getEntity(entityMap, bufferId);
              if (buffer === undefined) {
                return null;
              }

              return (
                <ListItem
                  key={bufferId}
                  bufferType={entityType}
                  bufferId={bufferId}
                  buffer={buffer}
                  source={source}
                  params={{
                    ...source,
                    ...buffer,
                  }}
                />
              );
            })}
            {emptyRows !== 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </Table>
          <Column p={2}>
            <TablePagination
              rowsPerPage={limit}
              page={offset / limit}
              count={bufferIds.length}
              onChangePage={useCallback((page: number) => setOffset(page * limit), [limit])}
              onChangeRowsPerPage={useCallback((rowsPerPage: number) => setLimit(rowsPerPage), [])}
            />
          </Column>
        </Card>
      </Column>
    );
  });
