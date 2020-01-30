import { Typography } from "@material-ui/core";
import { InsertDriveFile } from "@material-ui/icons";
import { push } from "connected-react-router";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ExerciseDraft } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Button, Card } from "../../ui";

export const ImportExerciseDraftDialog = createDialog<{}>()(
  React.memo(({ t }) => t("問題集のインポート")),
  React.memo(() => {
    const dispatch = useDispatch();

    const fileInput = useRef<HTMLInputElement>(null);
    const fileReader = new FileReader();

    const onRequest = () => {
      if (fileInput.current == null) {
        return;
      }

      fileInput.current.click();
    };
    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (fileList == null) {
        return;
      }

      const file = fileList.item(0);
      if (file == null) {
        return;
      }

      fileReader.addEventListener("load", onLoad);
      fileReader.readAsText(file);
    };
    const onLoad = () => {
      const fileString = fileReader.result;
      if (typeof fileString !== "string") {
        return;
      }

      const exercise: Params<ExerciseDraft> = JSON.parse(fileString);
      const bufferId = generateBufferId();

      dispatch(actions.buffers.update("ExerciseDraft", bufferId, exercise));
      dispatch(push(`/exercises/${bufferId}/edit`));
    };

    return (
      <>
        <Card>
          <Typography>問題集をファイルから読み込みます。</Typography>
        </Card>
        <input ref={fileInput} type="file" hidden accept="application/json" onChange={onSelect} />
        <Button icon={<InsertDriveFile />} label="問題集をインポート" onClick={onRequest} />
      </>
    );
  })
);
