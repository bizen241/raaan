import { Button, Typography } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import { replace } from "connected-react-router";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ExerciseDraft } from "../../../shared/api/entities";
import { createDialog } from "../../enhancers/createDialog";
import { useEntity } from "../../hooks/useEntity";
import { actions } from "../../reducers";
import { isLocalOnly } from "../../reducers/api";
import { UserContext } from "../project/Context";
import { Column, DialogContent, DialogHeader, Row } from "../ui";
import { useStyles } from "../ui/styles";

export const UploadExerciseDraftDialog = createDialog<{
  exerciseDraftId: string;
}>(
  React.memo(({ exerciseDraftId, onClose }) => {
    const classes = useStyles();

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題集をアップロード</Typography>
        </DialogHeader>
        <DialogContent>
          <UploadExerciseDraftDialogContent exerciseDraftId={exerciseDraftId} />
          <Column pb={1}>
            <Button className={classes.largeButton} variant="contained" onClick={onClose}>
              <Typography>キャンセル</Typography>
            </Button>
          </Column>
        </DialogContent>
      </>
    );
  })
);

const UploadExerciseDraftDialogContent = React.memo<{
  exerciseDraftId: string;
}>(({ exerciseDraftId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useContext(UserContext);

  const { uploadStatus, uploadResponse } = useEntity<ExerciseDraft>("ExerciseDraft", exerciseDraftId);
  useEffect(() => {
    if (uploadStatus === 200 && uploadResponse !== undefined) {
      const exerciseId = Object.keys(uploadResponse.Exercise)[0];

      dispatch(replace(`/exercises/${exerciseId}`));
    }
  }, [uploadStatus]);

  const [uploadConfig, setUploadConfig] = useState<"public" | "private" | "update" | "draft">();
  const onUpload = () => {
    dispatch(
      actions.buffers.update("ExerciseDraft", exerciseDraftId, {
        isMerged: uploadConfig === "draft" ? false : undefined,
        isPrivate: uploadConfig === "public" ? false : undefined
      })
    );
    dispatch(actions.api.upload("ExerciseDraft", exerciseDraftId));
  };

  if (uploadConfig === undefined) {
    return (
      <>
        <Row alignItems="center" flex={1} pb={1}>
          <Warning className={classes.leftIcon} />
          <Typography>アップロードの設定を選択して下さい。</Typography>
        </Row>
        {isLocalOnly(exerciseDraftId) && currentUser.permission !== "Read" && (
          <Column pb={1}>
            <Button
              className={classes.largeButton}
              variant="contained"
              color="primary"
              onClick={() => setUploadConfig("public")}
            >
              <Typography>公開</Typography>
            </Button>
          </Column>
        )}
        {isLocalOnly(exerciseDraftId) && (
          <Column pb={1}>
            <Button
              className={classes.largeButton}
              variant="contained"
              color="secondary"
              onClick={() => setUploadConfig("private")}
            >
              <Typography>非公開</Typography>
            </Button>
          </Column>
        )}
        {!isLocalOnly(exerciseDraftId) && (
          <Column pb={1}>
            <Button
              className={classes.largeButton}
              variant="contained"
              color="primary"
              onClick={() => setUploadConfig("update")}
            >
              <Typography>更新</Typography>
            </Button>
          </Column>
        )}
        <Column pb={1}>
          <Button
            className={classes.largeButton}
            variant="contained"
            color="secondary"
            onClick={() => setUploadConfig("draft")}
          >
            <Typography>下書き</Typography>
          </Button>
        </Column>
      </>
    );
  } else {
    return (
      <>
        <Row alignItems="center" flex={1} pb={1}>
          {uploadConfig === "public" && (
            <>
              <Warning className={classes.leftIcon} />
              <Typography>クイズが公開されます。</Typography>
            </>
          )}
          {uploadConfig === "private" && (
            <>
              <Warning className={classes.leftIcon} />
              <Typography>クイズが非公開で投稿されます。</Typography>
            </>
          )}
          {uploadConfig === "update" && (
            <>
              <Warning className={classes.leftIcon} />
              <Typography>クイズが更新されます。</Typography>
            </>
          )}
          {uploadConfig === "draft" && (
            <>
              <Warning className={classes.leftIcon} />
              <Typography>クイズが下書きとして保存されます。</Typography>
            </>
          )}
        </Row>
        <Column pb={1}>
          <Button className={classes.largeButton} variant="contained" color="primary" onClick={onUpload}>
            <Typography>アップロード</Typography>
          </Button>
        </Column>
      </>
    );
  }
});
