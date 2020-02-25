import { Typography } from "@material-ui/core";
import { Home, LinkOff, Send } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../shared/api/entities";
import { useSearch } from "../../hooks/useSearch";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { Loading } from "../project/Loading";
import { Button, Card } from "../ui";
import { GroupSummaryViewer } from "../viewers/GroupSummaryViewer";

export const GroupApplicationEditor = React.memo<{
  groupId: EntityId<"Group">;
  groupSecretValue: string;
}>(({ groupId, groupSecretValue }) => {
  const dispatch = useDispatch();

  const onUpload = () => {
    dispatch(
      actions.api.upload(
        "GroupApplication",
        generateBufferId(),
        {
          groupId,
          secret: groupSecretValue
        },
        () => {
          dispatch(replace("/user/group-applications"));
        }
      )
    );
  };

  const { entities: groupSecrets, status, onReload } = useSearch("GroupSecret", {
    groupId,
    value: groupSecretValue
  });
  if (status !== 200) {
    return <Loading getStatus={status} onReload={onReload} />;
  }

  const groupSecret = groupSecrets[0];
  if (groupSecret === undefined || groupSecret.expireAt < Date.now()) {
    return (
      <>
        <Button icon={<Home />} label="ホームへ" />
        <Card icon={<LinkOff />} title="無効なリンク">
          <Typography>リンクが無効です。</Typography>
        </Card>
      </>
    );
  }

  return (
    <>
      <Button color="primary" icon={<Send />} label="参加を申請" onClick={onUpload} />
      <GroupSummaryViewer entityId={groupSecret.groupSummaryId} />
    </>
  );
});
