import { Typography } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { GroupMember } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadGroupMemberDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ groupId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = () => {
      dispatch(
        actions.api.upload<GroupMember>(
          "GroupMember",
          generateBufferId(),
          {
            groupId,
            userId: currentUser.id
          },
          uploadResponse => {
            dispatch(
              actions.cache.add<GroupMember>(
                "GroupMember",
                {
                  groupId,
                  userId: currentUser.id
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
      <DialogContent title="グループに参加" onClose={onClose}>
        <Card icon={<PersonAdd />} title="グループに参加">
          <Typography>グループに参加します。</Typography>
        </Card>
        <Button icon={<PersonAdd />} label="参加" onClick={onUpload} />
      </DialogContent>
    );
  })
);
