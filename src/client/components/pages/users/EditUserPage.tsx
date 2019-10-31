import * as React from "react";
import { useContext } from "react";
import { UserEditor } from "../../editor/UserEditor";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui";

export const EditUserPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "プロフィールの編集" : "ユーザーの編集"}>
      <UserEditor bufferId={userId} />
    </Page>
  );
});
