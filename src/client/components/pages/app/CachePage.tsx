import { IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createEntityTypeToObject, EntityType } from "../../../../shared/api/entities";
import { actions } from "../../../reducers";
import { Button, Card, Page } from "../../ui";

const entityTypes = Object.keys(createEntityTypeToObject()) as EntityType[];

export const CachePage = React.memo(() => {
  const dispatch = useDispatch();

  return (
    <Page title="キャッシュ">
      <Button
        icon={<Delete />}
        label="すべてのキャッシュを削除"
        onClick={() => {
          dispatch(actions.cache.purge(undefined, undefined));
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
                  <IconButton onClick={() => dispatch(actions.cache.purge(entityType, undefined))}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Page>
  );
});
