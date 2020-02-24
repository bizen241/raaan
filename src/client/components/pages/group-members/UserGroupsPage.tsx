import { Add, Edit, Inbox } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { generateBufferId } from "../../../reducers/buffers";
import { UserGroupMemberList } from "../../lists/group-members/UserGroupMemberList";
import { Button } from "../../ui";

export const UserGroupsPage = createPage()(
  React.memo(({ t }) => t("所属グループ")),
  React.memo(() => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();

    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      dispatch(push(`/groups/${bufferId}/edit`));
    }, []);

    return (
      <>
        <Button icon={<Add />} label="新しいグループを作る" onClick={onCreate} />
        <Button icon={<Edit />} label="編集中のグループ" to={`/groups/edit`} />
        <Button icon={<Inbox />} label="申請一覧" to={`/users/${currentUserId}/groups/applications`} />
        <UserGroupMemberList initialParams={{ userId: currentUserId }} />
      </>
    );
  })
);
