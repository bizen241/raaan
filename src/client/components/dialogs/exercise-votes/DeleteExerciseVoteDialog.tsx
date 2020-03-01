import { Typography } from "@material-ui/core";
import { HowToVote } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteExerciseVoteDialog = createDialog<{
  exerciseVoteId: EntityId<"ExerciseVote">;
}>()(
  React.memo(({ t }) => t("投票の取り消し")),
  React.memo(({ exerciseVoteId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("ExerciseVote", exerciseVoteId, dialogTimeout, onClose));
    };

    return (
      <>
        <Card>
          <Typography>投票を取り消します。</Typography>
        </Card>
        <Button icon={<HowToVote />} label="投票を取り消す" onClick={onDelete} />
      </>
    );
  })
);
