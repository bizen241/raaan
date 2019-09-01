import {
  Avatar,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableFooter,
  TablePagination,
  TableRow,
  Typography
} from "@material-ui/core";
import { List } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { EntityObject, EntityType } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { RootState } from "../../../reducers";
import { useStyles } from "../../ui/styles";

export interface BufferListProps {
  title?: React.ReactNode;
}

export interface BufferListItemProps<E extends EntityObject> {
  bufferId: string;
  buffer: SaveParams<E>;
  source: Partial<E> | undefined;
}

export const createBufferList = <E extends EntityObject>(
  entityType: EntityType,
  ListItem: React.ComponentType<BufferListItemProps<E>>
) =>
  React.memo<BufferListProps>(({ title }) => {
    const classes = useStyles();

    const { bufferMap, entityMap } = useSelector((state: RootState) => ({
      bufferMap: state.buffers[entityType],
      entityMap: state.cache.get[entityType] as { [key: string]: E | undefined }
    }));

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const bufferEntries = Object.entries(bufferMap);
    const offset = limit * page;

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar className={classes.cardAvatar}>
              <List />
            </Avatar>
          }
          title={<Typography>{title || "編集中"}</Typography>}
        />
        <Table>
          <TableBody>
            {bufferEntries.slice(offset, offset + limit).map(([bufferId, buffer]) => (
              <ListItem key={bufferId} bufferId={bufferId} buffer={buffer} source={entityMap[bufferId]} />
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
