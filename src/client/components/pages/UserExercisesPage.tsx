import { Box } from "@material-ui/core";
import * as React from "react";
import { useContext } from "react";
import { ExerciseList } from "../list/search/ExerciseList";
import { UserContext } from "../project/Context";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const UserExercisesPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;
  const currentUser = useContext(UserContext);

  return (
    <Page title={userId === currentUser.id ? "自分の問題集" : "ユーザーの問題集"}>
      <Box display="flex" flexDirection="column" py={1}>
        <ExerciseList
          searchParams={{
            authorId: userId
          }}
        />
      </Box>
    </Page>
  );
});
