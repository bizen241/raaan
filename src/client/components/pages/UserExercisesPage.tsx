import { Box } from "@material-ui/core";
import * as React from "react";
import { connector } from "../../reducers";
import { ExerciseList } from "../list/search/ExerciseList";
import { PageProps } from "../project/Router";
import { Page } from "./Page";

export const UserExercisesPage = connector(
  (state, { match }: PageProps) => ({
    userId: match.params.id,
    currentUserId: state.app.userId
  }),
  () => ({}),
  ({ userId, currentUserId }) => {
    return (
      <Page title={userId === currentUserId ? "自分の問題集" : "ユーザーの問題集"}>
        <Box display="flex" flexDirection="column" py={1}>
          <ExerciseList
            searchParams={{
              authorId: userId
            }}
          />
        </Box>
      </Page>
    );
  }
);
