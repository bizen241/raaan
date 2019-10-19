import { Avatar, Card, CardContent, CardHeader, MenuItem, Typography } from "@material-ui/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import { DeleteQuestionDialog } from "../../dialogs/exercises/DeleteQuestionDialog";
import { QuestionPreviewer } from "../../player/dialogs/QuestionPreviewer";
import { Menu } from "../../ui/Menu";
import { useStyles } from "../../ui/styles";
import { HighlightedTextField } from "./HighlightedTextField";

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
        <HighlightedTextField
          value={question.value}
          onChange={useCallback((value: string) => onUpdate(questionIndex, { value }), [questionIndex])}
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
