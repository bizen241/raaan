import { Add } from "@material-ui/icons";
import { useCallback, useState } from "react";
import * as React from "react";
import { Question } from "../../../../shared/api/entities";
import { Button, Column } from "../../ui";
import { QuestionEditor } from "./QuestionEditor";

export const QuestionsEditor = React.memo<{
  questions: Question[];
  onChange: (questions: Question[]) => void;
}>(({ onChange, ...props }) => {
  const [questions, updateQuestions] = useState(props.questions);

  const onInsertQuestion = useCallback((index: number) => {
    updateQuestions(previousQuestions => {
      const id = previousQuestions.reduce((maxId, question) => Math.max(question.id, maxId), 0) + 1;

      const nextQuestions: Question[] = [
        ...previousQuestions.slice(0, index + 1),
        {
          id,
          lang: "ja",
          format: "plain",
          value: "",
          comment: ""
        },
        ...previousQuestions.slice(index + 1)
      ];

      onChange(nextQuestions);
      return nextQuestions;
    });
  }, []);
  const onUpdateQuestion = useCallback((index: number, updatedProps: Partial<Question>) => {
    updateQuestions(previousQuestions => {
      const nextQuestions = [
        ...previousQuestions.slice(0, index),
        {
          ...previousQuestions[index],
          ...updatedProps
        } as Question,
        ...previousQuestions.slice(index + 1)
      ];

      onChange(nextQuestions);
      return nextQuestions;
    });
  }, []);
  const onDeleteQuestion = useCallback((index: number) => {
    updateQuestions(previousQuestions => {
      const nextQuestions = [...previousQuestions.slice(0, index), ...previousQuestions.slice(index + 1)];

      onChange(nextQuestions);
      return nextQuestions;
    });
  }, []);

  return (
    <Column>
      {questions.map((question, index) => (
        <Column key={question.id} pb={1}>
          <QuestionEditor
            questionIndex={index}
            question={question}
            onUpdate={onUpdateQuestion}
            onDelete={onDeleteQuestion}
          />
        </Column>
      ))}
      <Column>
        <Button
          color="primary"
          icon={<Add />}
          label="問題を追加"
          onClick={useCallback(() => onInsertQuestion(questions.length - 1), [questions.length])}
        />
      </Column>
    </Column>
  );
});
