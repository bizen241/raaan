import { Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { EntityObject, EntityType, EntityTypeToEntity } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { Column, TablePagination } from "../components/ui";
import { RootState } from "../reducers";

interface BufferListProps {
  title?: React.ReactNode;
}

interface BufferListItemProps<E extends EntityObject> {
  bufferId: string;
  buffer: Params<E>;
  source: E | undefined;
}

export const createBufferList = <T extends EntityType>(entityType: T) => (
  ListItem: React.ComponentType<BufferListItemProps<EntityTypeToEntity[T]>>
) =>
  React.memo<BufferListProps>(() => {
    const { bufferMap, entityMap } = useSelector((state: RootState) => ({
      bufferMap: state.buffers[entityType],
      entityMap: state.cache.get[entityType] as { [key: string]: EntityTypeToEntity[T] | undefined }
    }));

    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const bufferEntries = Object.entries(bufferMap);
    const emptyRows = limit - bufferEntries.length;

    return (
      <Column pb={1}>
        <Card>
          <Table>
            <TableBody>
              {bufferEntries.slice(offset, offset + limit).map(([bufferId, buffer]) => (
                <ListItem key={bufferId} bufferId={bufferId} buffer={buffer} source={entityMap[bufferId]} />
              ))}
              {emptyRows && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
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
