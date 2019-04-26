import * as React from "react";
import { useMemo } from "react";
import { ExerciseDetail, Question } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createExerciseDetail } from "../../../domain/content";
import { connector } from "../../../reducers";
import { Modal } from "../../ui";
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
    const params = useMemo<SaveParams<ExerciseDetail>>(
      () => ({
        ...createExerciseDetail(),
        questions: [question]
      }),
      [question]
    );
    const id = useMemo(() => Date.now().toString(), [params]);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ExercisePlayer id={id} params={params} />
      </Modal>
    );
  }
);
