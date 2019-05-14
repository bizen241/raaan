import * as React from "react";
import { useMemo } from "react";
import { ExerciseDetail } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { connector } from "../../../reducers";
import { Column, Modal } from "../../ui";
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
