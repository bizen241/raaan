import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadSuggestionCommentDialog = createDialog<{
  bufferId: EntityId<"SuggestionComment">;
  targetId: EntityId<"Suggestion">;
}>()(
  React.memo(({ t }) => t("提案へのコメントをアップロード")),
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
      <>
        <Card>
          <Typography>提案へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="提案へのコメントをアップロード" onClick={onUpload} />
      </>
    );
  })
);
