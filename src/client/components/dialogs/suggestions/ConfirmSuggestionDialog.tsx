import { Typography } from "@material-ui/core";
import { WbIncandescent } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Exercise } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card, DialogContent } from "../../ui";

export const ConfirmSuggestionDialog = createDialog<{
  exercise: Exercise;
}>(
  React.memo(({ exercise, onClose }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      dispatch(
        actions.buffers.update("Suggestion", bufferId, {
          title: exercise.title,
          tags: exercise.tags,
          description: exercise.description,
          questions: exercise.questions,
          revisionId: exercise.latestId
        })
      );
      dispatch(push(`/suggestions/${bufferId}/edit`));
    }, []);

    return (
      <DialogContent title="変更を提案する" onClose={onClose}>
        <Card>
          <Typography>変更を提案しますか？</Typography>
        </Card>
        <Button icon={<WbIncandescent />} label="変更を提案する" onClick={onCreate} />
      </DialogContent>
    );
  })
);
