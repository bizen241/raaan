import { Typography } from "@material-ui/core";
import { CloudUpload, Event } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadContestDialog = createDialog<{
  contestId: string;
}>(
  React.memo(({ contestId: bufferId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Contest", bufferId, undefined, uploadResponse => {
          const contestId = Object.keys(uploadResponse.Contest)[0];

          dispatch(replace(`/contests/${contestId}`));
        })
      );
    };

    return (
      <DialogContent title="セッションをアップロード" onClose={onClose}>
        <Card icon={<Event />} title="セッションをアップロード">
          <Typography>セッションをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
