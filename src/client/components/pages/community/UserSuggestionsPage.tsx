import { Edit, Inbox, Send } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Button } from "../../ui";

export const UserSuggestionsPage = createPage<"User">()(
  React.memo(({ t }) => t("提案履歴")),
  React.memo(({ entityId: userId }) => {
    const { currentUserId } = useCurrentUser();

    const isOwn = userId === currentUserId;

    return (
      <>
        {isOwn && <Button icon={<Edit />} label="編集中の提案" to={`/suggestions/edit`} />}
        <Button icon={<Send />} label="送信した提案" to={`/users/${userId}/suggestions/uploaded`} />
        <Button icon={<Inbox />} label="受信した提案" to={`/users/${userId}/suggestions/received`} />
      </>
    );
  })
);
