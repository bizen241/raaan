import { Box } from "@material-ui/core";
import * as React from "react";
import { useContext } from "react";
import { ExerciseSummaryList } from "../list/ExerciseSummaryList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Page } from "../ui/Page";

export const UserExercisesPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;
  const currentUser = useContext(UserContext);

  return (
    <Page title={userId === currentUser.id ? "自分の問題集" : "ユーザーの問題集"}>
      <Box display="flex" flexDirection="column" pb={1}>
        <ExerciseSummaryList
          initialSearchParams={{
            authorId: userId
          }}
        />
      </Box>
    </Page>
  );
});
