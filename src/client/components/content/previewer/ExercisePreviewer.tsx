import * as React from "react";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { connector } from "../../../reducers";
import { Modal } from "../../ui";
import { ExercisePlayer } from "../player/ExercisePlayer";

export const ExercisePreviewer = connector(
  ({ dialog }, ownProps: { params: SaveParams<ExerciseDetail> }) => ({
    ...ownProps,
    isOpen: dialog.name === "ExercisePreviewer"
  }),
  ({ dialog }) => ({
    onClose: dialog.close
  }),
  ({ params, isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ExercisePlayer id={Date.now().toString()} params={params} />
      </Modal>
    );
  }
);
