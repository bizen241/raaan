import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadExerciseCommentDialog = createDialog<{
  bufferId: string;
  targetId: string;
}>(
  React.memo(({ bufferId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("ExerciseComment", bufferId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "ExerciseComment",
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
      <DialogContent title="問題集へのコメントをアップロード" onClose={onClose}>
        <Card>
          <Typography>問題集へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="問題集へのコメントをアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
