import { Card, TableCell, TableRow } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { Column, Table, TablePagination } from "../components/ui";
import { RootState } from "../reducers";

interface BufferListProps {
  title?: React.ReactNode;
}

interface BufferListItemProps<E extends EntityObject> {
  bufferType: EntityType;
  bufferId: string;
  buffer: Params<E>;
  source: E | undefined;
  params: Params<E>;
}

export const createBufferList = <T extends EntityType>(entityType: T) => (
  ListItem: React.ComponentType<BufferListItemProps<EntityTypeToEntity[T]>>
) =>
  React.memo<BufferListProps>(() => {
    const bufferMap = useSelector((state: RootState) => state.buffers[entityType]);
    const entityMap = useSelector(
      (state: RootState) => state.cache.get[entityType] as { [key: string]: EntityTypeToEntity[T] | undefined }
    );

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const bufferEntries = Object.entries(bufferMap);
    const emptyRows = limit - bufferEntries.length;

    return (
      <Column pb={1}>
        <Card>
          <Table>
            {bufferEntries.slice(offset, offset + limit).map(([bufferId, buffer]) => {
              const source = entityMap[bufferId];

              return (
                <ListItem
                  key={bufferId}
                  bufferType={entityType}
                  bufferId={bufferId}
                  buffer={buffer}
                  source={source}
                  params={{
                    ...source,
                    ...buffer
                  }}
                />
              );
            })}
            {emptyRows && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </Table>
          <Column p={2}>
            <TablePagination
              rowsPerPage={limit}
              page={offset / limit}
              count={bufferEntries.length}
              onChangePage={useCallback((page: number) => setOffset(page * limit), [limit])}
              onChangeRowsPerPage={useCallback((rowsPerPage: number) => setLimit(rowsPerPage), [])}
            />
          </Column>
        </Card>
      </Column>
    );
  });
