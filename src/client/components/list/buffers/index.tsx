import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { actions, RootState } from "../../../reducers";
import { Buffer } from "../../../reducers/buffers";

export interface BufferListItemProps<E extends EntityObject> {
  bufferId: string;
  buffer: Buffer<E>;
}

export const BufferList = React.memo<{
  entityType: EntityType;
  itemComponent: React.ComponentType<BufferListItemProps<any>>;
}>(({ entityType, itemComponent: ListItem }) => {
  const dispatch = useDispatch();
  const { bufferMap } = useSelector((state: RootState) => ({
    bufferMap: state.buffers[entityType]
  }));

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const offset = limit * page;

  const bufferEntries = Object.entries(bufferMap);

  return (
    <Paper>
      <Toolbar>
        <Typography variant="h6">編集中</Typography>
      </Toolbar>
      <Table>
        <TableBody>
          {bufferEntries.slice(offset, offset + limit).map(([bufferId, buffer]) => (
            <TableRow key={bufferId}>
              <TableCell>
                <ListItem bufferId={bufferId} buffer={buffer} />
              </TableCell>
              <TableCell padding="checkbox">
                <IconButton onClick={() => dispatch(actions.buffers.delete(entityType, bufferId))}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
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
    </Paper>
  );
});
