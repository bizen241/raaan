import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import { useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { isNumber } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadSuggestionDialog = createDialog<{
  suggestionId: string;
  exerciseId: string;
}>(
  React.memo(({ suggestionId, exerciseId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload("Suggestion", suggestionId, undefined, uploadResponse => {
          if (isNumber(suggestionId)) {
            dispatch(
              actions.cache.add(
                "SuggestionSummary",
                {
                  authorId: currentUser.id,
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
      <DialogContent title="変更を提案する" onClose={onClose}>
        <Card>
          <Typography>変更を提案します。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="提案をアップロード" onClick={onUpload} />
      </DialogContent>
    );
  })
);
