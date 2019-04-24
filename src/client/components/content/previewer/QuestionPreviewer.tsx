import * as React from "react";
import { useMemo } from "react";
import { ExerciseDetail, Question } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { createExerciseDetail } from "../../../domain/content";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { ExercisePreviewDialog } from "./ExercisePreviewDialog";

export const QuestionPreviewer = connector(
  (state, ownProps: { question: Question }) => ({
    ...ownProps,
    isOpen: state.dialog.name === "QuestionPreviewer"
  }),
  () => ({
    onClose: dialogActions.close
  }),
  ({ question, isOpen, onClose }) => {
    const params = useMemo<SaveParams<ExerciseDetail>>(
      () => ({
        ...createExerciseDetail(),
        questions: [question]
      }),
      [question]
    );

    return <ExercisePreviewDialog params={params} isOpen={isOpen} onClose={onClose} />;
  }
);
