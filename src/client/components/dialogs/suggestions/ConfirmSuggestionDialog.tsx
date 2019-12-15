import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card, DialogContent } from "../../ui";

export const ConfirmSuggestionDialog = createDialog<{
  targetId: string;
}>(
  React.memo(({ onClose }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      dispatch(
        actions.buffers.update("Suggestion", bufferId, {
          revisionId: ""
        })
      );
      dispatch(push(`/suggestions/${bufferId}/edit`));
    }, []);

    return (
      <DialogContent title="変更を提案する" onClose={onClose}>
        <Card>
          <Typography>変更を提案しますか？</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="変更を提案する" onClick={onCreate} />
      </DialogContent>
    );
  })
);
