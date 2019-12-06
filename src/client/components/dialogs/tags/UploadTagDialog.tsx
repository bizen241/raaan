import { Typography } from "@material-ui/core";
import { CloudUpload, Person } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadTagDialog = createDialog<{
  tagId: string;
}>(
  React.memo(({ tagId: bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Tag", bufferId, undefined, uploadResponse => {
          const tag = Object.values(uploadResponse.Tag)[0];

          if (tag !== undefined) {
            dispatch(replace(`/tags/${tag.name}`));
          } else {
            dispatch(replace(`/tags`));
          }
        })
      );
    };

    return (
      <DialogContent title="タグをアップロード" onClose={onClose}>
        <Card icon={<Person />} title="タグをアップロード">
          <Typography>タグをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
