import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import { CloudUpload, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { Question } from "../../../../shared/api/entities";
import { withBuffer } from "../../../enhancers/withBuffer";
import { useToggleState } from "../../../hooks/useToggleState";
import { UploadExerciseDraftDialog } from "../../dialogs/exercise-drafts/UploadExerciseDraftDialog";
import { ExercisePreviewer } from "../../player/dialogs/ExercisePreviewer";
import { UserContext } from "../../project/Context";
import { Button, Column } from "../../ui";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseDraftEditor = withBuffer("ExerciseDraft")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();
    const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

    const onUpdateTitle = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ title: e.target.value }),
      []
    );
    const onUpdateTags = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange({ tags: e.target.value.split(/\s/) }),
      []
    );
    const onUpdateQuestions = useCallback((questions: Question[]) => onChange({ questions }), []);

    const canUpload =
      (source && !source.isMerged) || (props.buffer !== undefined && currentUser.permission !== "Guest");

    return (
      <Column flex={1}>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Column pb={1}>
          <Card>
            <CardContent>
              <Column pb={1}>
                <Column component="label">
                  <Typography color="textSecondary">題名</Typography>
                  <TextField
                    variant="outlined"
                    defaultValue={buffer.title || source.title || ""}
                    onChange={onUpdateTitle}
                  />
                </Column>
              </Column>
              <Column>
                <Column component="label">
                  <Typography color="textSecondary">タグ</Typography>
                  <TextField
                    variant="outlined"
                    defaultValue={(buffer.tags || source.tags || []).join(" ")}
                    onChange={onUpdateTags}
                  />
                </Column>
              </Column>
            </CardContent>
          </Card>
        </Column>
        <QuestionsEditor questions={buffer.questions || source.questions || []} onChange={onUpdateQuestions} />
        <Button color="secondary" icon={<PlayArrow />} label="プレビュー" onClick={onToggleExercisePreviewer} />
        <UploadExerciseDraftDialog
          exerciseDraftId={bufferId}
          exerciseId={source && source.exerciseId}
          isOpen={isUploadDialogOpen}
          onClose={onToggleUploadDialog}
        />
        <ExercisePreviewer
          exercise={{
            ...buffer,
            ...source
          }}
          isOpen={isExercisePreviewerOpen}
          onClose={onToggleExercisePreviewer}
        />
      </Column>
    );
  })
);
