import {
  Box,
  Button,
  DialogContent,
  FormControlLabel,
  NativeSelect,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { createDialog, DialogHeader } from ".";
import { Question, QuestionType } from "../../../shared/api/entities";

export const InsertQuestionDialog = createDialog<{
  questions: Question[];
  questionIndex: number;
  onInsert: (questions: Question[], index: number) => void;
}>(
  React.memo(({ questions, questionIndex, onInsert, onClose }) => {
    const [selectedQuestionType, changeQuestionType] = useState<QuestionType>(
      questions.length > 0 ? questions[questions.length].type : "Trace"
    );
    const [selectedNumberOfQuestions, changeNumberOfQuestions] = useState(1);

    const onInsertQuestions = () => {
      const newQuestions: Question[] = [];
      const id = questions.reduce((maxId, question) => Math.max(question.id, maxId), 0) + 1;

      for (let i = 0; i < selectedNumberOfQuestions; i++) {
        newQuestions.push(createQuestion(selectedQuestionType, id + i));
      }

      onInsert(newQuestions, questionIndex);
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>問題を追加</Typography>
        </DialogHeader>
        <DialogContent>
          <Box pb={1}>
            <RadioGroup value={selectedQuestionType} onChange={(_, value) => changeQuestionType(value as QuestionType)}>
              {Object.entries(questionTypeToLabel).map(([questionType, label]) => (
                <FormControlLabel value={questionType} control={<Radio />} label={label} />
              ))}
            </RadioGroup>
          </Box>
          <Box pb={1}>
            <NativeSelect
              input={<OutlinedInput labelWidth={0} />}
              value={selectedNumberOfQuestions}
              onChange={e => changeNumberOfQuestions(Number(e.target.value))}
            >
              <option value={1}>1</option>
            </NativeSelect>
          </Box>
          <Button onChange={onInsertQuestions}>問題を追加</Button>
        </DialogContent>
      </>
    );
  })
);

const createQuestion = (type: QuestionType, id: number): Question => {
  const base = {
    id,
    lang: "ja",
    rubric: "",
    comment: ""
  };

  switch (type) {
    case "Trace": {
      return {
        ...base,
        type,
        value: "",
        format: "plain"
      };
    }
    case "Fill": {
      return {
        ...base,
        type,
        value: ""
      };
    }
    case "Input": {
      return {
        ...base,
        type,
        value: "",
        answer: ""
      };
    }
    case "Flip": {
      return {
        ...base,
        type,
        front: {
          lang: "ja",
          value: ""
        },
        back: {
          lang: "en",
          value: ""
        }
      };
    }
    case "Select": {
      return {
        ...base,
        type,
        items: [],
        answer: 0
      };
    }
    case "Order": {
      return {
        ...base,
        type,
        items: []
      };
    }
  }
};

const questionTypeToLabel: { [P in QuestionType]: string } = {
  Fill: "穴埋め",
  Flip: "裏返し",
  Input: "入力",
  Order: "並べ替え",
  Select: "選択",
  Trace: "書き写し"
};
