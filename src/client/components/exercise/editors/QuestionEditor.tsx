import { Classes, Collapse, MenuItem } from "@blueprintjs/core";
// import { CompositeDecorator, ContentState, Editor, EditorState } from "draft-js";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import {
  addRuby,
  rubySeparatorCharacter,
  rubyTerminatorCharacter,
  rubyAnchorCharacter
} from "../../../domain/content/ruby";
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
    // const [editorState, setEditorState] = useState(createEditorState(question.value));
    const [isCompositing, toggleCompositionState] = useState(false);

    const { value } = question;

    /*
    useEffect(() => {
      if (isRubyRequested) {
        addRuby(editorState.getCurrentContent().getPlainText(), result => {
          updateQuestion(bufferId, questionIndex, "value", result);
          setEditorState(createEditorState(result));
          toggleRubyState(false);
        });
      }
    }, [isRubyRequested]);
    */
    useEffect(() => {
      if (isRubyRequested) {
        addRuby(value, result => {
          updateQuestion(bufferId, questionIndex, "value", result);
          toggleRubyState(false);
        });
      }
    }, [isRubyRequested]);

    const hoge: JSX.Element[] = [];
    value.split("\n").forEach(line => {
      // let cursor = 0;

      /*
        const anchorPosition = value.indexOf(rubyAnchorCharacter, cursor);
        if (anchorPosition !== -1) {
          hoge.push(<span key={cursor}>{value.slice(cursor, anchorPosition)}</span>, <span key={anchorPosition}>{rubyAnchorCharacter}</span>);

          cursor = anchorPosition + 1;

          return;
        }

        const separatorPosition = value.indexOf(rubySeparatorCharacter, cursor);
        const terminatorPosition = value.indexOf(rubyTerminatorCharacter, cursor);
        if (separatorPosition !== -1 && terminatorPosition !== -1 && separatorPosition < terminatorPosition) {
          hoge.push(
            <span></span>
          );

          cursor = terminatorPosition + 1;
        }

        if (terminatorPosition !== -1) {

        }
        */
      let cursor = 0;
      let matched: RegExpExecArray | null;

      const rubyRegExp = new RegExp(
        `${rubyAnchorCharacter}([^${rubySeparatorCharacter}]+)${rubySeparatorCharacter}([^${rubyTerminatorCharacter}]+)${rubyTerminatorCharacter}`,
        "g"
      );

      // tslint:disable-next-line: no-conditional-assignment
      while ((matched = rubyRegExp.exec(line)) !== null) {
        const start = matched.index;

        if (cursor !== start) {
          hoge.push(<span key={cursor}>{line.slice(cursor, start)}</span>);
        }

        hoge.push(
          <span key={start} style={{ color: "#999" }}>
            {rubyAnchorCharacter}
          </span>,
          <span key={start + 1}>{matched[1]}</span>,
          <span key={start + 2} style={{ color: "#999" }}>
            {rubySeparatorCharacter}
            {matched[2]}
            {rubyTerminatorCharacter}
          </span>
        );

        cursor += matched[0].length;
      }

      if (cursor === 0) {
        hoge.push(<span key="last">{line + "\n"}</span>);
      } else {
        hoge.push(<span key="last">{line.slice(cursor) + "\n"}</span>);
      }
    });

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
            <Column style={{ position: "relative" }}>
              {/*
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
              */}
              {!isCompositing ? <Highlight>{hoge}</Highlight> : null}
              <TextArea
                isCompositing={isCompositing}
                onCompositionStart={useCallback(() => toggleCompositionState(true), [])}
                onCompositionEnd={useCallback(() => toggleCompositionState(false), [])}
                className={Classes.INPUT}
                defaultValue={question.value}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateQuestion(bufferId, questionIndex, "value", e.target.value),
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

const Highlight = styled.div`
  position: absolute;
  font-size: 14px;
  z-index: 1;
  pointer-events: none;
  background-color: transparent;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: inherit;
`;

const TextArea = styled.textarea<{
  isCompositing: boolean;
}>`
  position: relative;
  margin: 0;
  background-color: transparent !important;
  z-index: 2;
  caret-color: black;
  color: ${p => (p.isCompositing ? "inherit" : "transparent !important")};
  resize: none;
  font-family: inherit;
`;

/*
const rubyRegExp = new RegExp(`${rubySeparatorCharacter}[^${rubySeparatorCharacter}]*${rubyTerminatorCharacter}`, "g");

const SmallText = styled.span`
  font-size: 100%;
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
*/
