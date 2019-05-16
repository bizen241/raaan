import { Button, Classes, Divider } from "@blueprintjs/core";
import { push } from "connected-react-router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { createExerciseDetail } from "../../domain/content";
import { connector } from "../../reducers";
import { buffersActions, generateBufferId } from "../../reducers/buffers";
import { ExerciseDetailBufferList } from "../list/buffers/ExerciseDetailBufferList";
import { ExerciseList } from "../list/search/ExerciseList";
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
        <Column padding="vertical">
          <Button text="新規作成" large icon="plus" intent="primary" onClick={onCreate} />
        </Column>
        <Divider />
        <Column padding="vertical">
          <h2 className={Classes.HEADING}>編集中</h2>
          <Column padding="vertical">
            <ExerciseDetailBufferList />
          </Column>
        </Column>
        <Column padding="vertical">
          <h2 className={Classes.HEADING}>保存済み</h2>
          <Column padding="vertical">
            <ExerciseList />
          </Column>
        </Column>
      </Page>
    );
  }
);
