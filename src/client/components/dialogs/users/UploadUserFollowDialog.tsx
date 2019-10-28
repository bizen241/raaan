import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { UserFollow } from "../../../../shared/api/entities";
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
        actions.api.upload<UserFollow>(
          "UserFollow",
          generateBufferId(),
          {
            followerId: currentUser.id,
            targetId
          },
          uploadResponse => {
            dispatch(
              actions.cache.search<UserFollow>(
                "UserFollow",
                {
                  followerId: currentUser.id,
                  targetId
                },
                {
                  ids: [Object.keys(uploadResponse.UserFollow)[0]],
                  entities: {},
                  count: 1
                }
              )
            );

            onClose();
          }
        )
      );
    };

    return (
      <DialogContent title="ユーザーをフォロー" onClose={onClose}>
        <Card icon={<PersonAdd />} title="ユーザーをフォロー">
          <Typography>ユーザーをフォローします。</Typography>
        </Card>
        <Button icon={<PersonAdd />} label="フォロー" onClick={onUpload} />
      </DialogContent>
    );
  })
);
