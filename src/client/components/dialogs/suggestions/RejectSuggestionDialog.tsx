import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const RejectSuggestionDialog = createDialog<{
  suggestionId: string;
}>(
  React.memo(({ suggestionId, onClose }) => {
    const dispatch = useDispatch();

    const onUnpublish = () =>
      dispatch(
        actions.api.upload(
          "Suggestion",
          suggestionId,
          {
            state: "rejected"
          },
          onClose
        )
      );

    return (
      <DialogContent title="提案を却下" onClose={onClose}>
        <Card>
          <Typography>提案が却下されます。</Typography>
        </Card>
        <Button icon={<Delete />} label="提案を却下する" onClick={onUnpublish} />
      </DialogContent>
    );
  })
);
