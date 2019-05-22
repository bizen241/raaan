import { Classes, Collapse, MenuItem } from "@blueprintjs/core";
import { CompositeDecorator, ContentState, Editor, EditorState } from "draft-js";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import { addRuby, rubySeparatorCharacter, rubyTerminatorCharacter } from "../../../domain/content/ruby";
import { connector } from "../../../reducers";
import { styled } from "../../../style";
import { Column, Details, PopMenu, Summary } from "../../ui";

export const QuestionEditor = connector(
  (
    _,
    ownProps: {
      bufferId: string;
      questionIndex: number;
      question: Question;
      onFocus: (questionIndex: number) => void;
    }
  ) => ({
    ...ownProps
  }),
  actions => ({
    ...actions.exercise,
    openDialog: actions.dialog.open
  }),
  ({ bufferId, question, questionIndex, updateQuestion, deleteQuestion, openDialog, onFocus }) => {
    const [isEditorOpen, toggleEditor] = useState(true);
    const [isRubyRequested, toggleRubyState] = useState(false);
    const [editorState, setEditorState] = useState(createEditorState(question.value));

    useEffect(() => {
      if (isRubyRequested) {
        addRuby(editorState.getCurrentContent().getPlainText(), result => {
          updateQuestion(bufferId, questionIndex, "value", result);
          setEditorState(createEditorState(result));
          toggleRubyState(false);
        });
      }
    }, [isRubyRequested]);

    return (
      <Details onFocus={useCallback(() => onFocus(questionIndex), [questionIndex])}>
        <Summary
          title={questionIndex.toString()}
          isOpen={isEditorOpen}
          onClick={useCallback(() => toggleEditor(s => !s), [])}
        >
          <PopMenu
            items={[
              <MenuItem
                key="p"
                text="プレビュー (p)"
                onClick={useCallback(() => openDialog("QuestionPreviewer"), [])}
              />,
              <MenuItem key="r" text="ルビ (r)" onClick={useCallback(() => toggleRubyState(true), [])} />,
              <MenuItem
                key="d"
                text="削除 (Delete)"
                onClick={useCallback(() => deleteQuestion(bufferId, questionIndex), [questionIndex])}
                intent="danger"
              />
            ]}
            hotKeys={{}}
          />
        </Summary>
        <Collapse isOpen={isEditorOpen}>
          <Column padding="around">
            <Column className={Classes.INPUT} style={{ height: "auto", padding: 0 }}>
              <Editor
                editorState={editorState}
                onChange={useCallback(
                  (nextEditorState: EditorState) => {
                    updateQuestion(
                      bufferId,
                      questionIndex,
                      "value",
                      nextEditorState.getCurrentContent().getPlainText()
                    );
                    setEditorState(nextEditorState);
                  },
                  [questionIndex]
                )}
              />
            </Column>
          </Column>
        </Collapse>
      </Details>
    );
  }
);

const rubyRegExp = new RegExp(`${rubySeparatorCharacter}[^${rubySeparatorCharacter}]*${rubyTerminatorCharacter}`, "g");

const SmallText = styled.span`
  font-size: 80%;
`;

const createEditorState = (value: string) =>
  EditorState.createWithContent(
    ContentState.createFromText(value),
    new CompositeDecorator([
      {
        strategy: (contentBlock, callback) => {
          const text = contentBlock.getText();

          text.split("").forEach((char, index) => {
            if (char === "｜") {
              callback(index, index + 1);
            }
          });
        },
        component: (props: { children: React.ReactNode; decoratedText: string }) => {
          return <SmallText className={Classes.TEXT_DISABLED}>{props.children}</SmallText>;
        }
      },
      {
        strategy: (contentBlock, callback) => {
          const text = contentBlock.getText();

          let matched;
          // tslint:disable-next-line: no-conditional-assignment
          while ((matched = rubyRegExp.exec(text)) !== null) {
            const start = matched.index;

            callback(start, start + matched[0].length);
          }
        },
        component: (props: React.HTMLProps<HTMLSpanElement>) => {
          return <SmallText className={Classes.TEXT_DISABLED}>{props.children}</SmallText>;
        }
      }
    ])
  );
