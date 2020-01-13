import { Typography } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { Suggestion } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const ConfirmAcceptSuggestionDialog = createDialog<{
  suggestion: Suggestion;
}>(
  React.memo(({ suggestion, onClose }) => {
    const dispatch = useDispatch();

    const { entity: exercise } = useEntity("Exercise", suggestion.exerciseId);
    if (exercise === undefined) {
      return null;
    }

    const onCreate = () => {
      dispatch(
        actions.buffers.update("ExerciseDraft", exercise.draftId, {
          title: suggestion.title,
          tags: suggestion.tags,
          description: suggestion.description,
          questions: suggestion.questions,
          messageSubject: "",
          suggestionId: suggestion.id
        })
      );
      dispatch(push(`/exercises/${exercise.draftId}/edit`));
    };

    return (
      <DialogContent title="提案の採用" onClose={onClose}>
        <Card>
          <Typography>提案を採用しますか？</Typography>
        </Card>
        <Button icon={<Check />} label="提案を採用する" onClick={onCreate} />
      </DialogContent>
    );
  })
);
