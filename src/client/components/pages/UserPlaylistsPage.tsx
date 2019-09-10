import { Box } from "@material-ui/core";
import * as React from "react";
import { useContext } from "react";
import { PlaylistSummaryList } from "../list/search/PlaylistSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const UserPlaylistsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;
  const currentUser = useContext(UserContext);

  return (
    <Page title={userId === currentUser.id ? "自分のプレイリスト" : "ユーザーのプレイリスト"}>
      <Box display="flex" flexDirection="column" pb={1}>
        <PlaylistSummaryList
          initialSearchParams={{
            authorId: userId
          }}
        />
      </Box>
    </Page>
  );
});
