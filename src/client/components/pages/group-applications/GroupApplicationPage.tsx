import { CircularProgress, Typography } from "@material-ui/core";
import { LinkOff, Send } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useSearch } from "../../../hooks/useSearch";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { PageProps } from "../../project/Router";
import { Button, Card, Column } from "../../ui";
import { Page } from "../../ui/Page";
import { GroupViewer } from "../../viewer/GroupViewer";

export const GroupApplicationPage = React.memo<PageProps>(props => {
  const groupId = props.match.params.id;
  const secret = props.match.params.secret;

  return (
    <Page title="グループへの参加を申請">
      <GroupApplicationPageContent groupId={groupId} secret={secret} />
    </Page>
  );
});

const GroupApplicationPageContent = React.memo<{
  groupId: string;
  secret: string;
}>(({ groupId, secret }) => {
  const dispatch = useDispatch();

  const { entities: groupSecrets, status } = useSearch("GroupSecret", {
    groupId,
    value: secret
  });
  const groupSecret = groupSecrets[0];

  const onUpload = () => {
    dispatch(
      actions.api.upload(
        "GroupApplication",
        generateBufferId(),
        {
          groupId,
          secret
        },
        () => {
          dispatch(replace("/user/group-applications"));
        }
      )
    );
  };

  if (status === 102) {
    return (
      <Column alignItems="center">
        <CircularProgress />
      </Column>
    );
  }

  if (groupSecret === undefined || groupSecret.expireAt < Date.now()) {
    return (
      <>
        <Button label="ホームへ" />
        <Card icon={<LinkOff />} title="無効なリンク">
          <Typography>リンクが無効です。</Typography>
        </Card>
      </>
    );
  }

  return (
    <>
      <Button color="primary" icon={<Send />} label="参加を申請" onClick={onUpload} />
      <GroupViewer entityId={groupId} hideActions />
    </>
  );
});
