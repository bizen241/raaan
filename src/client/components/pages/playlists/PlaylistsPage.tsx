import { Bookmarks, Person } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { PlaylistSummaryList } from "../../lists/playlist-summaries/PlaylistSummaryList";
import { Button } from "../../ui";

export const PlaylistsPage = createPage()(
  React.memo(({ t }) => t("プレイリストを探す")),
  React.memo(() => {
    const { currentUser } = useCurrentUser();

    return (
      <>
        <Button icon={<Person />} label="自分のプレイリスト" to={`/users/${currentUser.id}/playlists`} />
        <Button icon={<Bookmarks />} label="ブックマーク" to={`/users/${currentUser.id}/bookmarks`} />
        <PlaylistSummaryList
          initialParams={{
            searchLimit: 10,
            searchOffset: 0,
            searchSort: "createdAt",
            searchOrder: "DESC",
          }}
        />
      </>
    );
  })
);
