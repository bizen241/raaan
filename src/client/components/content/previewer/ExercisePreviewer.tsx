import * as React from "react";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { ExercisePreviewDialog } from "./ExercisePreviewDialog";

export const ExercisePreviewer = connector(
  (state, ownProps: { params: SaveParams<ExerciseDetail> }) => ({
    ...ownProps,
    isOpen: state.dialog.name === "ExercisePreviewer"
  }),
  () => ({
    onClose: dialogActions.close
  }),
  ({ params, isOpen, onClose }) => {
    return <ExercisePreviewDialog params={params} isOpen={isOpen} onClose={onClose} />;
  }
);
