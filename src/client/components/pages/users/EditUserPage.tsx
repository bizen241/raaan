import React, { useContext } from "react";
import { UserEditor } from "../../editors/UserEditor";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const EditUserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "プロフィールの設定" : "ユーザーの編集"}>
      <UserEditor bufferId={userId} />
    </Page>
  );
});
