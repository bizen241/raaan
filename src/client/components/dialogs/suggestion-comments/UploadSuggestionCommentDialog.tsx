import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const UploadSuggestionCommentDialog = createDialog<{
  bufferId: string;
  targetId: string;
}>(
  React.memo(({ bufferId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("SuggestionComment", bufferId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "SuggestionComment",
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
      <DialogContent title="提案へのコメントをアップロード" onClose={onClose}>
        <Card>
          <Typography>提案へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="提案へのコメントをアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
