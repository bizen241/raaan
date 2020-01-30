import { Typography } from "@material-ui/core";
import { AddAlert } from "@material-ui/icons";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card } from "../../ui";

export const UploadTagFollowDialog = createDialog<{
  targetId: string;
}>()(
  React.memo(({ t }) => t("タグをフォロー")),
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
      <>
        <Card>
          <Typography>タグをフォローします。</Typography>
        </Card>
        <Button icon={<AddAlert />} label="タグをフォロー" onClick={onUpload} />
      </>
    );
  })
);
