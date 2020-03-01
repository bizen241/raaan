import { Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const DeleteSynonymDialog = createDialog<{
  synonymId: EntityId<"Synonym">;
  target: string;
}>()(
  React.memo(({ t }) => t("タグの別名の削除")),
  React.memo(({ synonymId, target }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(
        actions.api.delete("Synonym", synonymId, dialogTimeout, () => {
          dispatch(push(`/tags/${target}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>タグの別名がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="タグの別名を削除" labelColor="error" onClick={onDelete} />
      </>
    );
  })
);
