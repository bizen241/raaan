import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const UploadUserFollowDialog = createDialog<{
  targetId: EntityId<"User">;
}>()(
  React.memo(({ t }) => t("ユーザーをフォロー")),
  React.memo(({ targetId, onClose }) => {
    const dispatch = useDispatch();
    const { currentUser } = useCurrentUser();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "UserFollow",
          generateLocalEntityId(),
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
      <>
        <Card>
          <Typography>ユーザーをフォローします。</Typography>
        </Card>
        <Button icon={<PersonAdd />} label="ユーザーをフォロー" onClick={onUpload} />
      </>
    );
  })
);
