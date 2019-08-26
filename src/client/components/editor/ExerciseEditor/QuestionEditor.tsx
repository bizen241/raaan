import { Avatar, Card, CardContent, CardHeader, MenuItem, Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Question, QuestionType } from "../../../../shared/api/entities";
import { DeleteQuestionDialog } from "../../dialogs/DeleteQuestionDialog";
import { QuestionPreviewer } from "../../player/QuestionPreviewer";
import { Menu } from "../../ui/Menu";
import { useStyles } from "../../ui/styles";
import { TraceQuestionEditor } from "./TraceQuestionEditor";

export const QuestionEditor = React.memo<{
  questionIndex: number;
  question: Question;
  onUpdate: (questionIndex: number, question: Partial<Question>) => void;
  onDelete: (questionIndex: number) => void;
}>(({ question, questionIndex, onUpdate, onDelete }) => {
  const classes = useStyles();

  const [isQuestionPreviewerOpen, toggleQuestionPreviewer] = useState(false);
  const onToggleQuestionPreviewer = useCallback(() => toggleQuestionPreviewer(s => !s), []);

  const [isDeleteQuestionDialogOpen, toggleDeleteQuestionDialog] = useState(false);
  const onToggleDeleteQuestionDialog = useCallback(() => toggleDeleteQuestionDialog(s => !s), []);

  const Editor = questionTypeToEditor[question.type];

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.cardAvatar}>
            <Typography color="textSecondary">{questionIndex.toString()}</Typography>
          </Avatar>
        }
        action={
          <Menu>
            <MenuItem onClick={onToggleQuestionPreviewer}>プレビュー</MenuItem>
            <MenuItem onClick={onToggleDeleteQuestionDialog}>削除</MenuItem>
          </Menu>
        }
      />
      <CardContent>
        <Editor
          question={question}
          onUpdate={useCallback((updatedProps: Partial<Question>) => onUpdate(questionIndex, updatedProps), [
            questionIndex
          ])}
        />
      </CardContent>
      <QuestionPreviewer question={question} isOpen={isQuestionPreviewerOpen} onClose={onToggleQuestionPreviewer} />
      <DeleteQuestionDialog
        onDelete={useCallback(() => onDelete(questionIndex), [questionIndex])}
        isOpen={isDeleteQuestionDialogOpen}
        onClose={onToggleDeleteQuestionDialog}
      />
    </Card>
  );
});

export interface QuestionEditorProps<Q extends Question> {
  question: Q;
  onUpdate: (updatedProps: Partial<Question>) => void;
}

const questionTypeToEditor: { [P in QuestionType]: React.ComponentType<QuestionEditorProps<any>> } = {
  Fill: TraceQuestionEditor,
  Flip: TraceQuestionEditor,
  Input: TraceQuestionEditor,
  Order: TraceQuestionEditor,
  Select: TraceQuestionEditor,
  Trace: TraceQuestionEditor
};
