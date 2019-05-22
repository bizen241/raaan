import * as React from "react";
import { useMemo } from "react";
import { Exercise, Question } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createExercise } from "../../../domain/content";
import { connector } from "../../../reducers";
import { Column, Modal } from "../../ui";
import { ExercisePlayer } from "../player/ExercisePlayer";

export const QuestionPreviewer = connector(
  ({ dialog }, ownProps: { question: Question }) => ({
    ...ownProps,
    isOpen: dialog.name === "QuestionPreviewer"
  }),
  ({ dialog }) => ({
    onClose: dialog.close
  }),
  ({ question, isOpen, onClose }) => {
    const params = useMemo<SaveParams<Exercise>>(
      () => ({
        ...createExercise(),
        questions: [question]
      }),
      [question]
    );
    const id = useMemo(() => Date.now().toString(), [params, isOpen]);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <Column flex={1} padding="vertical">
          <ExercisePlayer id={id} params={params} />
        </Column>
      </Modal>
    );
  }
);
