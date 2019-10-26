import { Box, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { Group } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { Button, Column } from "../ui";

export const GroupEditor = withBuffer<Group>("Group")(
  React.memo(({ buffer = {}, source = {}, onChange }) => {
    const onUpdateName = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ name: e.target.value }),
      []
    );
    const onUpdateDescription = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ description: e.target.value }),
      []
    );

    return (
      <Box>
        <Button icon={<CloudUpload />} label="アップロード" />
        <Column pb={1}>
          <Card>
            <CardContent>
              <Column pb={1}>
                <Typography color="textSecondary">グループ名</Typography>
                <TextField variant="outlined" defaultValue={buffer.name || source.name || ""} onChange={onUpdateName} />
              </Column>
              <Column>
                <Typography color="textSecondary">説明</Typography>
                <TextField
                  variant="outlined"
                  defaultValue={buffer.description || source.description || ""}
                  onChange={onUpdateDescription}
                />
              </Column>
            </CardContent>
          </Card>
        </Column>
      </Box>
    );
  })
);
