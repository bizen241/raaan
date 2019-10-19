import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Column, Row } from "../../ui";
import { DialogContent, DialogHeader } from "../../ui/Dialog";
import { useStyles } from "../../ui/styles";

export const UploadUserConfigDialog = createDialog<{
  userConfigId: string;
}>(
  React.memo(({ userConfigId, onClose }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(actions.api.upload("UserConfig", userConfigId));
      onClose();
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題集をアップロード</Typography>
        </DialogHeader>
        <DialogContent>
          <Row flex={1} alignItems="center" pb={1}>
            <CloudUpload className={classes.leftIcon} />
            <Typography>設定をアップロードします。</Typography>
          </Row>
          <Column pb={1}>
            <Button label="アップロード" onClick={onUpload} />
          </Column>
          <Column pb={1}>
            <Button label="キャンセル" onClick={onClose} />
          </Column>
        </DialogContent>
      </>
    );
  })
);
