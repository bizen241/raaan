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

type IdentifiedQuestion = {
  id: number;
  content: Question;
};

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

  const [questions, setQuestions] = useState<IdentifiedQuestion[]>(
    initialQuestions.map((question, index) => ({
      id: index,
      content: question
    }))
  );

  const updateBuffer = (nextQuestions: IdentifiedQuestion[]) =>
    dispatch(
      actions.buffers.update<Exercise>("Exercise", exerciseId, {
        questions: nextQuestions.map(question => question.content)
      })
    );

  const onAppendQuestion = useCallback(() => {
    const id = questions.reduce((maxId, question) => Math.max(question.id, maxId), 0) + 1;

    setQuestions(prevQuestions => {
      const nextQuestions = [...prevQuestions, { id, content: createQuestion() }];

      updateBuffer(nextQuestions);
      return nextQuestions;
    });
  }, []);
  const onUpdateQuestion = useCallback((index: number, updatedProps: Partial<Question>) => {
    setQuestions(prevQuestions => {
      const targetQuestion = prevQuestions[index];

      const nextQuestions = [
        ...prevQuestions.slice(0, index),
        {
          id: targetQuestion.id,
          content: { ...targetQuestion.content, ...updatedProps }
        },
        ...prevQuestions.slice(index + 1)
      ];

      updateBuffer(nextQuestions);
      return nextQuestions;
    });
  }, []);
  const onDeleteQuestion = useCallback((index: number) => {
    setQuestions(prevQuestions => {
      const nextQuestions = [...prevQuestions.slice(0, index), ...prevQuestions.slice(index + 1)];

      updateBuffer(nextQuestions);
      return nextQuestions;
    });
  }, []);

  return (
    <Box display="flex" flexDirection="column">
      {questions.map((question, index) => (
        <Box key={question.id} display="flex" flexDirection="column" pb={1}>
          <QuestionEditor
            questionIndex={index}
            question={question.content}
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
        <QuestionPreviewer question={questions[focusedQuestionIndex].content} onClose={onToggleQuestionPreviewer} />
      </Dialog>
    </Box>
  );
});
