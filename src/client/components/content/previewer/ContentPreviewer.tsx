import * as React from "react";
import { ExerciseRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { ContentPreviewDialog } from "./ContentPreviewDialog";

export const ContentPreviewer = connector(
  (state, ownProps: { params: SaveParams<ExerciseRevision> }) => ({
    ...ownProps,
    isOpen: state.dialog.name === "ContentPreviewer"
  }),
  () => ({
    onClose: dialogActions.close
  }),
  ({ params, isOpen, onClose }) => {
    return <ContentPreviewDialog params={params} isOpen={isOpen} onClose={onClose} />;
  }
);
