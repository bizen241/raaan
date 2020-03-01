import { Typography } from "@material-ui/core";
import { AddAlert } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const UploadTagFollowDialog = createDialog<{
  targetId: EntityId<"Tag">;
}>()(
  React.memo(({ t }) => t("タグをフォロー")),
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "TagFollow",
          generateLocalEntityId(),
          {
            followerId: currentUserId,
            targetId
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "TagFollow",
                {
                  followerId: currentUserId,
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
