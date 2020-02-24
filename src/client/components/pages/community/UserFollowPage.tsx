import { Hearing, Label, Person } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { Button } from "../../ui";

export const UserFollowPage = createPage<"User">()(
  React.memo(({ t }) => t("フォロー")),
  React.memo(({ entityId: userId }) => {
    return (
      <>
        <Button icon={<Label />} label="フォロー中のタグ" to={`/users/${userId}/follwing/tags`} />
        <Button icon={<Person />} label="フォロー中のユーザー" to={`/users/${userId}/follwing/users`} />
        <Button icon={<Hearing />} label="フォロワー" to={`/users/${userId}/followers`} />
      </>
    );
  })
);
