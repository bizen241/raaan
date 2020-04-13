import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadExerciseCommentDialog = createDialog<{
  bufferId: EntityId<"ExerciseComment">;
  targetId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("問題集へのコメントをアップロード")),
  React.memo(({ bufferId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("ExerciseComment", bufferId, undefined, (uploadResponse) => {
          dispatch(
            actions.cache.add(
              "ExerciseComment",
              {
                targetId,
              },
              uploadResponse
            )
          );

          onClose();
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>問題集へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="問題集へのコメントをアップロード" onClick={onUpload} />
      </>
    );
  })
);
