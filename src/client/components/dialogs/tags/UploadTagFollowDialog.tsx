import { Typography } from "@material-ui/core";
import { AddAlert } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadTagFollowDialog = createDialog<{
  targetId: string;
}>(
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentTag = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "TagFollow",
          generateBufferId(),
          {
            followerId: currentTag.id,
            targetId
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "TagFollow",
                {
                  followerId: currentTag.id,
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
      <DialogContent title="タグをフォロー" onClose={onClose}>
        <Card icon={<AddAlert />} title="タグをフォロー">
          <Typography>タグをフォローします。</Typography>
        </Card>
        <Button icon={<AddAlert />} label="フォロー" onClick={onUpload} />
      </DialogContent>
    );
  })
);
