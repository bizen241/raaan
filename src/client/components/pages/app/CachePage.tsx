import { Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createEntityTypeToObject, EntityType } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { Page } from "../../project/Page";
import { Button, Card, IconButton } from "../../ui";

const entityTypes = Object.keys(createEntityTypeToObject()) as EntityType[];

export const CachePage = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <Page title="キャッシュ">
      <Button
        icon={<Delete />}
        label="キャッシュを削除"
        onClick={() => {
          dispatch(actions.cache.purge(undefined, undefined));
        }}
      />
      <Button
        icon={<Delete />}
        label="ストレージをクリア"
        onClick={() => {
          localStorage.clear();
          location.reload();
        }}
      />
      <Card padding={false}>
        <Table>
          <TableBody>
            {entityTypes.map(entityType => (
              <TableRow key={entityType}>
                <TableCell>
                  <Typography>{entityType}</Typography>
                </TableCell>
                <TableCell padding="checkbox">
                  <IconButton icon={Delete} onClick={() => dispatch(actions.cache.purge(entityType, undefined))} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
});
