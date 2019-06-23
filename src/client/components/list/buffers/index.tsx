import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
} from "@material-ui/core";
import { Delete, List } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { actions, RootState } from "../../../reducers";
import { Buffer } from "../../../reducers/buffers";
import { useStyles } from "../../ui/styles";

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

  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.cardAvatar}>
            <List />
          </Avatar>
        }
        title="編集中"
        titleTypographyProps={{ variant: "h6" }}
      />
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
    </Card>
  );
});
