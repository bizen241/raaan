import { Typography } from "@material-ui/core";
import { Home, LinkOff, Send } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { withSearch } from "../../enhancers/withSearch";
import { actions } from "../../reducers";
import { generateBufferId } from "../../reducers/buffers";
import { Button, Card } from "../ui";
import { GroupSummaryViewer } from "../viewers/GroupSummaryViewer";

export const GroupApplicationEditor = withSearch("GroupSecret")(
  React.memo(({ entities: groupSecrets, params }) => {
    const groupSecret = groupSecrets[0];

    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload(
          "GroupApplication",
          generateBufferId(),
          {
            groupId: params.groupId,
            secret: params.value
          },
          () => {
            dispatch(replace("/user/group-applications"));
          }
        )
      );
    };

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
  })
);
