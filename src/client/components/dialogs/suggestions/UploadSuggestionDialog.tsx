import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { isNumber } from "../../../reducers/buffers";
import { Button, Card } from "../../ui";

export const UploadSuggestionDialog = createDialog<{
  suggestionId: EntityId<"Suggestion">;
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("変更を提案する")),
  React.memo(({ suggestionId, exerciseId }) => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Suggestion", suggestionId, undefined, uploadResponse => {
          if (isNumber(suggestionId)) {
            dispatch(
              actions.cache.add(
                "SuggestionSummary",
                {
                  authorId: currentUserId,
                  exerciseId
                },
                uploadResponse
              )
            );
          }

          dispatch(replace(`/exercises/${exerciseId}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>変更を提案します。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="提案をアップロード" onClick={onUpload} />
      </>
    );
  })
);
