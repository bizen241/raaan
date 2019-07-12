import { Box, Button, Dialog } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useCallback, useState } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { Exercise } from "../../../../shared/api/entities";
import { Question } from "../../../../shared/api/entities";
import { createQuestion } from "../../../domain/exercise/create";
import { actions } from "../../../reducers";
import { QuestionPreviewer } from "../../player/QuestionPreviewer";
import { useStyles } from "../../ui/styles";
import { QuestionEditor } from "./QuestionEditor";

export const QuestionsEditor = React.memo<{
  exerciseId: string;
  questions: Question[];
}>(({ exerciseId, questions: initialQuestions }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [focusedQuestionIndex, focusQuestion] = useState(0);
  const onFocusQuestion = useCallback((questionIndex: number) => focusQuestion(questionIndex), []);

  const [isQuestionPreviewerOpen, toggleQuestionPreviewer] = useState(false);
  const onToggleQuestionPreviewer = useCallback(() => toggleQuestionPreviewer(s => !s), []);

  const [questions, setQuestions] = useState(initialQuestions);

  const onAppendQuestion = useCallback(() => {
    const id = questions.reduce((maxId, question) => Math.max(question.id, maxId), 0);

    setQuestions(prevQuestions => {
      const nextQuestions = [...prevQuestions, createQuestion(id)];
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { questions: nextQuestions }));
      return nextQuestions;
    });
  }, []);
  const onUpdateQuestion = useCallback((index: number, question: Partial<Question>) => {
    setQuestions(prevQuestions => {
      const nextQuestions = [
        ...prevQuestions.slice(0, index),
        { ...prevQuestions[index], ...question },
        ...prevQuestions.slice(index + 1)
      ];
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { questions: nextQuestions }));
      return nextQuestions;
    });
  }, []);
  const onDeleteQuestion = useCallback((index: number) => {
    setQuestions(prevQuestions => {
      const nextQuestions = [...prevQuestions.slice(0, index), ...prevQuestions.slice(index + 1)];
      dispatch(actions.buffers.update<Exercise>("Exercise", exerciseId, { questions: nextQuestions }));
      return nextQuestions;
    });
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {questions.map((question, index) => (
        <Box key={question.id} display="flex" flexDirection="column" pb={1}>
          <QuestionEditor
            questionIndex={index}
            question={question}
            onFocus={onFocusQuestion}
            onUpdate={onUpdateQuestion}
            onDelete={onDeleteQuestion}
            onPreview={onToggleQuestionPreviewer}
          />
        </Box>
      ))}
      <Box display="flex" flexDirection="column" pb={1}>
        <Button className={classes.largeButton} variant="contained" color="primary" onClick={onAppendQuestion}>
          <Add className={classes.leftIcon} />
          問題を追加
        </Button>
      </Box>
      <Dialog fullScreen open={isQuestionPreviewerOpen} onClose={onToggleQuestionPreviewer}>
        <QuestionPreviewer question={questions[focusedQuestionIndex]} onClose={onToggleQuestionPreviewer} />
      </Dialog>
    </Box>
  );
});
