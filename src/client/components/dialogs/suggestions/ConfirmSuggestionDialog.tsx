import { Typography } from "@material-ui/core";
import { WbIncandescent } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Exercise } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const ConfirmSuggestionDialog = createDialog<{
  exercise: Exercise;
}>()(
  React.memo(({ t }) => t("変更を提案する")),
  React.memo(({ exercise }) => {
    const dispatch = useDispatch();

    const onCreate = useCallback(() => {
      const bufferId = generateLocalEntityId<"Suggestion">();

      dispatch(
        actions.buffers.update("Suggestion", bufferId, {
          title: exercise.title,
          tags: exercise.tags,
          description: exercise.description,
          questions: exercise.questions,
          exerciseId: exercise.id,
          revisionId: exercise.latestId
        })
      );
      dispatch(push(`/suggestions/${bufferId}/edit`));
    }, []);

    return (
      <>
        <Card>
          <Typography>変更を提案しますか？</Typography>
        </Card>
        <Button icon={<WbIncandescent />} label="変更を提案する" onClick={onCreate} />
      </>
    );
  })
);
