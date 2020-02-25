import { PlayArrow } from "@material-ui/icons";
import React, { useCallback } from "react";
import { ExerciseContent, Question } from "../../../../shared/api/entities";
import { useToggleState } from "../../../hooks/useToggleState";
import { ExercisePreviewer } from "../../player/dialogs/ExercisePreviewer";
import { Button, Card, Column, TextField } from "../../ui";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseEditor = React.memo<{
  params: Partial<ExerciseContent>;
  onChange: (exercise: Partial<ExerciseContent>) => void;
}>(props => {
  const { params, onChange } = props;

  const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

  const onUpdateTitle = useCallback((title: string) => onChange({ title }), []);
  const onUpdateTags = useCallback((tags: string) => onChange({ tags: tags.split(/\s/) }), []);
  const onUpdateQuestions = useCallback((questions: Question[]) => onChange({ questions }), []);

  return (
    <Column flex={1}>
      <Card>
        <TextField label="題名" defaultValue={params.title || ""} onChange={onUpdateTitle} />
        <TextField label="タグ" defaultValue={(params.tags || []).join(" ")} onChange={onUpdateTags} />
      </Card>
      <QuestionsEditor questions={params.questions || []} onChange={onUpdateQuestions} />
      <Button color="secondary" icon={<PlayArrow />} label="プレビュー" onClick={onToggleExercisePreviewer} />
      <ExercisePreviewer
        exercise={{
          title: params.title,
          tags: params.tags,
          questions: params.questions
        }}
        isOpen={isExercisePreviewerOpen}
        onClose={onToggleExercisePreviewer}
      />
    </Column>
  );
});
