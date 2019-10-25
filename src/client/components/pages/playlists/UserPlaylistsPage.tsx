import { Edit } from "@material-ui/icons";
import { useContext, useMemo } from "react";
import * as React from "react";
import { PlaylistSummaryList } from "../../list/PlaylistSummaryList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Column } from "../../ui";
import { Page } from "../../ui/Page";

export const UserPlaylistsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const currentUser = useContext(UserContext);

  const initialParams = useMemo(() => ({ authorId: userId }), []);

  return (
    <Page title={userId === currentUser.id ? "自分のプレイリスト" : "ユーザーのプレイリスト"}>
      <Button icon={<Edit />} label="編集中のプレイリスト" to={`/playlists/edit`} />
      <Column pb={1}>
        <PlaylistSummaryList initialParams={initialParams} />
      </Column>
    </Page>
  );
});
