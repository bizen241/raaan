import { Typography } from "@material-ui/core";
import { FastRewind } from "@material-ui/icons";
import { push } from "connected-react-router";
import { useCallback } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Revision } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const ConfirmRevertDialog = createDialog<{
  revision: Revision;
}>(
  React.memo(({ revision, onClose }) => {
    const dispatch = useDispatch();

    const { exerciseId } = revision;

    const onCreate = useCallback(() => {
      dispatch(
        actions.buffers.update("ExerciseDraft", exerciseId, {
          title: revision.title,
          tags: revision.tags,
          description: revision.description,
          questions: revision.questions,
          messageSubject: "",
          revisionId: revision.id
        })
      );
      dispatch(push(`/exercises/${exerciseId}/edit`));
    }, []);

    return (
      <DialogContent title="この版に戻す" onClose={onClose}>
        <Card>
          <Typography>この版を元に編集しますか？</Typography>
        </Card>
        <Button icon={<FastRewind />} label="この版に戻す" onClick={onCreate} />
      </DialogContent>
    );
  })
);
