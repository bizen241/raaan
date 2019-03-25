import * as React from "react";
import { useMemo } from "react";
import { ExerciseRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { ExerciseItem } from "../../../../shared/content";
import { createExerciseRevision } from "../../../domain/content";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { ExercisePreviewDialog } from "./ExercisePreviewDialog";

export const ExerciseItemPreviewer = connector(
  (state, ownProps: { item: ExerciseItem }) => ({
    ...ownProps,
    isOpen: state.dialog.name === "ExerciseItemPreviewer"
  }),
  () => ({
    onClose: dialogActions.close
  }),
  ({ item, isOpen, onClose }) => {
    const params = useMemo<SaveParams<ExerciseRevision>>(
      () => ({
        ...createExerciseRevision(""),
        items: [item]
      }),
      [item]
    );

    return <ExercisePreviewDialog params={params} isOpen={isOpen} onClose={onClose} />;
  }
);
