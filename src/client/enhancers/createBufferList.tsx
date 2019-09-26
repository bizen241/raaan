import { Card, Table, TableBody, TableCell, TableFooter, TablePagination, TableRow } from "@material-ui/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../shared/api/entities";
import { Params } from "../../shared/api/request/params";
import { RootState } from "../reducers";

interface BufferListParams {
  entityType: EntityType;
}

interface BufferListProps {
  title?: React.ReactNode;
  elevation?: number;
}

interface BufferListItemProps<E extends EntityObject> {
  bufferId: string;
  buffer: Params<E>;
  source: E | undefined;
}

export const createBufferList = <E extends EntityObject>({ entityType }: BufferListParams) => (
  ListItem: React.ComponentType<BufferListItemProps<E>>
) =>
  React.memo<BufferListProps>(({ elevation }) => {
    const { bufferMap, entityMap } = useSelector((state: RootState) => ({
      bufferMap: state.buffers[entityType],
      entityMap: state.cache.get[entityType] as { [key: string]: E | undefined }
    }));

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const bufferEntries = Object.entries(bufferMap);
    const offset = limit * page;
    const emptyRows = limit - bufferEntries.length;

    return (
      <Card elevation={elevation}>
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={limit}
                page={page}
                count={bufferEntries.length}
                labelRowsPerPage="表示件数:"
                onChangePage={useCallback((_, newPage) => setPage(newPage), [])}
                onChangeRowsPerPage={useCallback(e => setLimit(parseInt(e.target.value, 10)), [])}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    );
  });
