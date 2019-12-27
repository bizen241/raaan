import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadObjectionCommentDialog = createDialog<{
  bufferId: string;
  targetId: string;
}>(
  React.memo(({ bufferId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("ObjectionComment", bufferId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "ObjectionComment",
              {
                targetId
              },
              uploadResponse
            )
          );

          onClose();
        })
      );
    };

    return (
      <DialogContent title="抗議へのコメントをアップロード" onClose={onClose}>
        <Card>
          <Typography>抗議へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="抗議へのコメントをアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
