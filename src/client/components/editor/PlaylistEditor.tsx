import { Box, Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { mergeBuffer } from "../../reducers/buffers";
import { Button, Column } from "../ui";

export const PlaylistEditor = withBuffer("Playlist")(
  React.memo(({ buffer, source, onChange }) => {
    const onUpdateTitle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ title: e.target.value }),
      []
    );
    const onUpdateDescription = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ description: e.target.value }),
      []
    );

    const params = mergeBuffer(source, buffer);

    return (
      <Box>
        <Button icon={<CloudUpload />} label="アップロード" />
        <Column pb={1}>
          <Card>
            <CardContent>
              <Column pb={1}>
                <Typography color="textSecondary">題名</Typography>
                <TextField variant="outlined" defaultValue={params.title || ""} onChange={onUpdateTitle} />
              </Column>
              <Column>
                <Typography color="textSecondary">説明</Typography>
                <TextField variant="outlined" defaultValue={params.description || ""} onChange={onUpdateDescription} />
              </Column>
            </CardContent>
          </Card>
        </Column>
      </Box>
    );
  })
);
