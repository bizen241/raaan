import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const UploadGroupMemberByOwnerDialog = createDialog<{
  groupId: EntityId<"Group">;
  applicantId: EntityId<"User">;
  groupApplicationId: EntityId<"GroupApplication">;
}>()(
  React.memo(({ t }) => t("申請を受理")),
  React.memo(({ groupId, applicantId, groupApplicationId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupMember",
          generateLocalEntityId(),
          {
            groupId,
            userId: applicantId
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "GroupMember",
                {
                  groupId,
                  userId: applicantId
                },
                uploadResponse
              )
            );
            setTimeout(() => dispatch(actions.cache.purge("GroupApplication", groupApplicationId)), dialogTimeout);

            onClose();
          }
        )
      );
    };

    return (
      <>
        <Card>
          <Typography>申請を受理します。</Typography>
        </Card>
        <Button icon={<PersonAdd />} label="受理" onClick={onUpload} />
      </>
    );
  })
);
