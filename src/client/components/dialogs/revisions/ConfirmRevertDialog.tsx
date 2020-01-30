import { Typography } from "@material-ui/core";
import { FastRewind } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { Revision } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const ConfirmRevertDialog = createDialog<{
  revision: Revision;
}>()(
  React.memo(({ t }) => t("この版に戻す")),
  React.memo(({ revision }) => {
    const dispatch = useDispatch();

    const { entity: exercise } = useEntity("Exercise", revision.exerciseId);
    if (exercise === undefined) {
      return null;
    }

    const onCreate = () => {
      dispatch(
        actions.buffers.update("ExerciseDraft", exercise.draftId, {
          title: revision.title,
          tags: revision.tags,
          description: revision.description,
          questions: revision.questions,
          messageSubject: "",
          revisionId: revision.id
        })
      );
      dispatch(push(`/exercises/${exercise.draftId}/edit`));
    };

    return (
      <>
        <Card>
          <Typography>この版を元に編集しますか？</Typography>
        </Card>
        <Button icon={<FastRewind />} label="この版に戻す" onClick={onCreate} />
      </>
    );
  })
);
