import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { UserEditor } from "../../editors/UserEditor";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditUserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useCurrentUser();

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "プロフィールの設定" : "ユーザーの編集"}>
      <UserEditor bufferId={userId} />
    </Page>
  );
});
