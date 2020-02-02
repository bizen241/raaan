import { CloudUpload } from "@material-ui/icons";
import React, { useCallback } from "react";
import { withBuffer } from "../../enhancers/withBuffer";
import { Button, Card, Column, TextField } from "../ui";

export const PlaylistEditor = withBuffer("Playlist")(
  React.memo(({ params, onChange }) => {
    const onUpdateTitle = useCallback((title: string) => onChange({ title }), []);
    const onUpdateDescription = useCallback((description: string) => onChange({ description }), []);

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" />
        <Card>
          <TextField label="題名" defaultValue={params.title || ""} onChange={onUpdateTitle} />
          <TextField label="説明" defaultValue={params.description || ""} onChange={onUpdateDescription} />
        </Card>
      </Column>
    );
  })
);
