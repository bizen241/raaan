import { TextField, Typography } from "@material-ui/core";
import { CloudUpload, Dns } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card, Column, DialogContent } from "../../ui";

export const UploadSynonymDialog = createDialog<{
  target: string;
}>(
  React.memo(({ target, onClose }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState();

    const onUpdateName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    }, []);
    const onUploadSynonym = () => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload(
          "Synonym",
          bufferId,
          {
            name,
            target
          },
          () => {
            onClose();
          }
        )
      );
    };

    return (
      <DialogContent title="タグの別名を作成" onClose={onClose}>
        <Card icon={<Dns />} title="タグの別名">
          <Column component="label">
            <Typography color="textSecondary">別名</Typography>
            <TextField variant="outlined" defaultValue={""} onChange={onUpdateName} />
          </Column>
        </Card>
        <Button icon={<CloudUpload />} label="タグの別名をアップロード" onClick={onUploadSynonym} />
      </DialogContent>
    );
  })
);
