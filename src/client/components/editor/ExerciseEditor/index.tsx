import { CloudUpload, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext } from "react";
import { Question } from "../../../../shared/api/entities";
import { withBuffer } from "../../../enhancers/withBuffer";
import { useToggleState } from "../../../hooks/useToggleState";
import { UploadExerciseDraftDialog } from "../../dialogs/exercise-drafts/UploadExerciseDraftDialog";
import { ExercisePreviewer } from "../../player/dialogs/ExercisePreviewer";
import { UserContext } from "../../project/Context";
import { Button, Card, Column, TextField } from "../../ui";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseDraftEditor = withBuffer("ExerciseDraft")(
  React.memo(props => {
    const { bufferId, buffer = {}, source = {}, onChange } = props;

    const currentUser = useContext(UserContext);

    const [isUploadDialogOpen, onToggleUploadDialog] = useToggleState();
    const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

    const onUpdateTitle = useCallback((title: string) => onChange({ title }), []);
    const onUpdateTags = useCallback((tags: string) => onChange({ tags: tags.split(/\s/) }), []);
    const onUpdateQuestions = useCallback((questions: Question[]) => onChange({ questions }), []);

    const canUpload =
      (source && !source.isMerged) || (props.buffer !== undefined && currentUser.permission !== "Guest");

    return (
      <Column flex={1}>
        <Button icon={<CloudUpload />} label="アップロード" disabled={!canUpload} onClick={onToggleUploadDialog} />
        <Card>
          <TextField label="題名" defaultValue={buffer.title || source.title || ""} onChange={onUpdateTitle} />
          <TextField label="タグ" defaultValue={(buffer.tags || source.tags || []).join(" ")} onChange={onUpdateTags} />
        </Card>
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
            title: buffer.title || source.title,
            tags: buffer.tags || source.tags,
            questions: buffer.questions || source.questions
          }}
          isOpen={isExercisePreviewerOpen}
          onClose={onToggleExercisePreviewer}
        />
      </Column>
    );
  })
);
