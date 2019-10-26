import { Add, Edit } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { generateBufferId } from "../../../reducers/buffers";
import { UserGroupMemberList } from "../../list/group-members/UserGroupMemberList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserGroupMembersPage = React.memo<PageProps>(() => {
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const onCreate = useCallback(() => {
    const bufferId = generateBufferId();

    dispatch(push(`/groups/${bufferId}/edit`));
  }, []);

  return (
    <Page title="所属グループ">
      <Button icon={<Add />} label="新しいグループを作る" onClick={onCreate} />
      <Button icon={<Edit />} label="編集中のグループ" to={`/groups/edit`} />
      <UserGroupMemberList initialParams={{ userId: currentUser.id }} />
    </Page>
  );
});
