import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { goBack } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteExerciseDialog = createDialog<{
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("問題集の削除")),
  React.memo(({ exerciseId }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(
        actions.api.delete("Exercise", exerciseId, dialogTimeout, () => {
          dispatch(goBack());
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>問題集がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="問題集を削除" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
