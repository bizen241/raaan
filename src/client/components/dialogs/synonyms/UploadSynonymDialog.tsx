import { CloudUpload } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card, TextField } from "../../ui";

export const UploadSynonymDialog = createDialog<{
  target: string;
}>()(
  React.memo(({ t }) => t("タグの別名を作成")),
  React.memo(({ target, onClose }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const onUpdateName = useCallback((value: string) => {
      setName(value);
    }, []);
    const onUploadSynonym = () => {
      dispatch(
        actions.api.upload(
          "Synonym",
          generateLocalEntityId(),
          {
            name,
            target,
          },
          () => {
            onClose();
          }
        )
      );
    };

    return (
      <>
        <Card>
          <TextField label="別名" defaultValue={name} onChange={onUpdateName} />
        </Card>
        <Button icon={<CloudUpload />} label="タグの別名をアップロード" onClick={onUploadSynonym} />
      </>
    );
  })
);
