import { Typography } from "@material-ui/core";
import { RemoveCircle } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const DeleteTagFollowDialog = createDialog<{
  tagFollowId: string;
}>(
  React.memo(({ tagFollowId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("TagFollow", tagFollowId, onClose));
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>フォロー解除</Typography>
        </DialogHeader>
        <DialogMessage icon={<RemoveCircle />}>
          <Typography>フォローを解除します。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button
            icon={<RemoveCircle color="error" />}
            label="フォローを解除する"
            labelColor="error"
            onClick={onDelete}
          />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
