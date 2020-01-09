import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadRevisionDialog = createDialog<{
  revisionId: string;
}>(
  React.memo(({ revisionId: bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Revision", bufferId, undefined, () => {
          dispatch(goBack());
        })
      );
    };

    return (
      <DialogContent title="編集履歴のアップロード" onClose={onClose}>
        <Card>
          <Typography>編集履歴をアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
