import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { ExerciseObjection } from "../../../shared/api/entities";
import { withBuffer } from "../../enhancers/withBuffer";
import { useToggleState } from "../../hooks/useToggleState";
import { UploadExerciseObjectionDialog } from "../dialogs/exercise-objections/UploadExerciseObjectionDialog";
import { Button, Column } from "../ui";

export const ExerciseObjectionEditor = withBuffer<ExerciseObjection>("ExerciseObjection")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();

    const onUpdateComment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ comment: e.target.value });
    }, []);

    const targetId = source.targetId || buffer.targetId;
    if (targetId === undefined) {
      return null;
    }

    const canUpload = (props.source !== undefined && props.buffer !== undefined) || buffer.comment !== undefined;

    return (
      <Column>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <CardContent>
            <Column pb={1}>
              <Typography color="textSecondary">コメント</Typography>
              <TextField
                variant="outlined"
                multiline
                defaultValue={buffer.comment || source.comment || ""}
                onChange={onUpdateComment}
              />
            </Column>
          </CardContent>
        </Card>
        <UploadExerciseObjectionDialog
          reportId={bufferId}
          targetId={targetId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
      </Column>
    );
  })
);
