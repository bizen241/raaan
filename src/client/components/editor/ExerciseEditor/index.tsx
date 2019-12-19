import { PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useCallback } from "react";
import { BaseExerciseObject, Question } from "../../../../shared/api/entities";
import { useToggleState } from "../../../hooks/useToggleState";
import { ExercisePreviewer } from "../../player/dialogs/ExercisePreviewer";
import { Button, Card, Column, TextField } from "../../ui";
import { QuestionsEditor } from "./QuestionsEditor";

export const ExerciseEditor = React.memo<{
  buffer: Partial<BaseExerciseObject>;
  source: Partial<BaseExerciseObject>;
  onChange: (exercise: Partial<BaseExerciseObject>) => void;
}>(props => {
  const { buffer = {}, source = {}, onChange } = props;

  const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

  const onUpdateTitle = useCallback((title: string) => onChange({ title }), []);
  const onUpdateTags = useCallback((tags: string) => onChange({ tags: tags.split(/\s/) }), []);
  const onUpdateQuestions = useCallback((questions: Question[]) => onChange({ questions }), []);

  return (
    <Column flex={1}>
      <Card>
        <TextField label="題名" defaultValue={buffer.title || source.title || ""} onChange={onUpdateTitle} />
        <TextField label="タグ" defaultValue={(buffer.tags || source.tags || []).join(" ")} onChange={onUpdateTags} />
      </Card>
      <QuestionsEditor questions={buffer.questions || source.questions || []} onChange={onUpdateQuestions} />
      <Button color="secondary" icon={<PlayArrow />} label="プレビュー" onClick={onToggleExercisePreviewer} />
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
});
