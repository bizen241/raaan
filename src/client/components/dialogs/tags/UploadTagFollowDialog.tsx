import { Typography } from "@material-ui/core";
import { AddAlert } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { TagFollow } from "../../../../shared/api/entities";
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
        actions.api.upload<TagFollow>(
          "TagFollow",
          generateBufferId(),
          {
            followerId: currentTag.id,
            targetId
          },
          uploadResponse => {
            dispatch(
              actions.cache.search<TagFollow>(
                "TagFollow",
                {
                  followerId: currentTag.id,
                  targetId
                },
                {
                  ids: [Object.keys(uploadResponse.TagFollow)[0]],
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
      <DialogContent title="タグをフォロー" onClose={onClose}>
        <Card icon={<AddAlert />} title="タグをフォロー">
          <Typography>タグをフォローします。</Typography>
        </Card>
        <Button icon={<AddAlert />} label="フォロー" onClick={onUpload} />
      </DialogContent>
    );
  })
);
