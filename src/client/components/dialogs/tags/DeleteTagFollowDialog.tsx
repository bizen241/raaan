import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteTagFollowDialog = createDialog<{
  tagFollowId: string;
}>(
  React.memo(({ tagFollowId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("TagFollow", tagFollowId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="タグのフォロー解除" onClose={onClose}>
        <Card>
          <Typography>タグのフォローを解除します。</Typography>
        </Card>
        <Button
          icon={<RemoveCircle color="error" />}
          label="フォローを解除する"
          labelColor="error"
          onClick={onDelete}
        />
      </DialogContent>
    );
  })
);
