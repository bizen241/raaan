import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const RejectSuggestionDialog = createDialog<{
  suggestionId: EntityId<"Suggestion">;
}>()(
  React.memo(({ t }) => t("提案を却下")),
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
      <>
        <Card>
          <Typography>提案が却下されます。</Typography>
        </Card>
        <Button icon={<Delete />} label="提案を却下する" onClick={onUnpublish} />
      </>
    );
  })
);
