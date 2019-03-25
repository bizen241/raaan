import { Button } from "@blueprintjs/core";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { createExerciseRevision } from "../../domain/content";
import { connector } from "../../reducers";
import { buffersActions, generateBufferId } from "../../reducers/buffers";
import { ExerciseRevisionBufferList } from "../list/buffers/ExerciseRevisionBufferList";
import { ContentList } from "../list/search/ContentList";
import { Header } from "../project/Header";
import { Column } from "../ui";
import { manageHotKey } from "../utils/hotKey";
import { Page } from "./Page";

export const Creator = connector(
  () => ({}),
  () => ({
    addBuffer: buffersActions.add,
    editBuffer: (bufferId: string) => push(`/content-revisions/${bufferId}/edit`)
  }),
  ({ addBuffer, editBuffer }) => {
    const onCreate = useCallback(() => {
      const bufferId = generateBufferId();

      addBuffer("ExerciseRevision", bufferId, createExerciseRevision());
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
        <Column padding>
          <Button large intent="primary" onClick={onCreate}>
            新規作成 (n)
          </Button>
        </Column>
        <Column padding>
          <ExerciseRevisionBufferList />
        </Column>
        <Column padding>
          <ContentList />
        </Column>
      </Page>
    );
  }
);
