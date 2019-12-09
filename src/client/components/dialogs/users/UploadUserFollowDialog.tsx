import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadUserFollowDialog = createDialog<{
  targetId: string;
}>(
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "UserFollow",
          generateBufferId(),
          {
            followerId: currentUser.id,
            targetId
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "UserFollow",
                {
                  followerId: currentUser.id,
                  targetId
                },
                uploadResponse
              )
            );

            onClose();
          }
        )
      );
    };

    return (
      <DialogContent title="ユーザーをフォロー" onClose={onClose}>
        <Card>
          <Typography>ユーザーをフォローします。</Typography>
        </Card>
        <Button icon={<PersonAdd />} label="ユーザーをフォロー" onClick={onUpload} />
      </DialogContent>
    );
  })
);
