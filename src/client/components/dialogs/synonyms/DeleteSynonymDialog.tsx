import { Typography } from "@material-ui/core";
import { Delete, Warning } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteSynonymDialog = createDialog<{
  synonymId: string;
  target: string;
}>(
  React.memo(({ synonymId, target, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(
        actions.api.delete("Synonym", synonymId, dialogTimeout, () => {
          dispatch(push(`/tags/${target}`));
        })
      );
    };

    return (
      <DialogContent title="タグの別名の削除" onClose={onClose}>
        <Card icon={<Warning />} title="タグの別名の削除">
          <Typography>タグの別名がサーバーから削除されます。</Typography>
        </Card>
        <Button icon={<Delete color="error" />} label="タグの別名を削除" labelColor="error" onClick={onDelete} />
      </DialogContent>
    );
  })
);
