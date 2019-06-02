import { Box, Button, Divider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { createExercise } from "../../domain/content";
import { connector } from "../../reducers";
import { buffersActions, generateBufferId } from "../../reducers/buffers";
import { ExerciseBufferList } from "../list/buffers/ExerciseBufferList";
import { ExerciseList } from "../list/search/ExerciseList";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const EditExercisesPage = connector(
  () => ({}),
  () => ({
    addBuffer: buffersActions.add,
    editBuffer: (bufferId: string) => push(`/exercises/${bufferId}/edit`)
  }),
  ({ addBuffer, editBuffer }) => {
    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      addBuffer("Exercise", bufferId, createExercise());
      editBuffer(bufferId);
    }, []);

    useEffect(
      manageHotKey({
        n: onCreate
      }),
      []
    );

    return (
      <Page>
        <Box display="flex" flexDirection="column" py={1}>
          <Button variant="contained" size="large" color="primary" onClick={onCreate}>
            <Add style={{ marginRight: "0.5em" }} />
            新しい問題集を作る
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <Divider variant="middle" />
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <ExerciseBufferList />
        </Box>
        <Box display="flex" flexDirection="column" py={1}>
          <ExerciseList searchParams={{}} />
        </Box>
      </Page>
    );
  }
);
