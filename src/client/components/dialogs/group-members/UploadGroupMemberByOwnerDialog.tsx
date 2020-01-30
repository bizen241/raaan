import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card } from "../../ui";

export const UploadGroupMemberByOwnerDialog = createDialog<{
  groupId: string;
  applicantId: string;
  groupApplicationId: string;
}>()(
  React.memo(({ t }) => t("申請を受理")),
  React.memo(({ groupId, applicantId, groupApplicationId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupMember",
          generateBufferId(),
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
