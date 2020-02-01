import { Typography } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { Suggestion } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { Loading } from "../../project/Loading";
import { Button, Card } from "../../ui";

export const ConfirmAcceptSuggestionDialog = createDialog<{
  suggestion: Suggestion;
}>()(
  React.memo(({ t }) => t("提案の採用")),
  React.memo(({ suggestion }) => {
    const dispatch = useDispatch();

    const { entity: exercise, ...exerciseProps } = useEntity("Exercise", suggestion.exerciseId);
    if (exercise === undefined) {
      return <Loading {...exerciseProps} />;
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
      <>
        <Card>
          <Typography>提案を採用しますか？</Typography>
        </Card>
        <Button icon={<Check />} label="提案を採用する" onClick={onCreate} />
      </>
    );
  })
);
