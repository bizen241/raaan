import { Button } from "@blueprintjs/core";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { createExerciseDetail } from "../../domain/content";
import { connector } from "../../reducers";
import { buffersActions, generateBufferId } from "../../reducers/buffers";
import { ExerciseDetailBufferList } from "../list/buffers/ExerciseDetailBufferList";
import { ExerciseList } from "../list/search/ExerciseList";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const Creator = connector(
  () => ({}),
  () => ({
    addBuffer: buffersActions.add,
    editBuffer: (bufferId: string) => push(`/exercise-details/${bufferId}/edit`)
  }),
  ({ addBuffer, editBuffer }) => {
    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      addBuffer("ExerciseDetail", bufferId, createExerciseDetail());
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
        <Header heading="作成" />
        <Column padding="around">
          <Button large intent="primary" onClick={onCreate}>
            新規作成 (n)
          </Button>
        </Column>
        <Column padding="around">
          <ExerciseDetailBufferList />
        </Column>
        <Column padding="around">
          <ExerciseList />
        </Column>
      </Page>
    );
  }
);
