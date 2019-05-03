import { Classes, Collapse, MenuItem } from "@blueprintjs/core";
import { CompositeDecorator, ContentState, Editor, EditorState } from "draft-js";
import * as React from "react";
import { useCallback, useState } from "react";
import { Question } from "../../../../shared/api/entities";
import { contentActions } from "../../../actions/exerciseDetail";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { styled } from "../../../style";
import { Column, Details, PopMenu, Summary } from "../../ui";

const RUBY_REGEX = /（[^）]*）/g;

const Anchor = styled.span`
  font-size: 80%;
  opacity: 0.8;
`;
const Ruby = styled.span`
  font-size: 80%;
  opacity: 0.8;
`;

export const QuestionEditor = connector(
  (
    _,
    ownProps: {
      bufferId: string;
      itemIndex: number;
      item: Question;
      onFocus: (itemIndex: number) => void;
    }
  ) => ({
    ...ownProps
  }),
  () => ({
    ...contentActions,
    openDialog: dialogActions.open
  }),
  ({ bufferId, item, itemIndex, updateItem, deleteItem, openDialog, onFocus }) => {
    const [isOpen, toggleEditor] = useState(true);
    const [editorState, setEditorState] = useState(
      EditorState.createWithContent(
        ContentState.createFromText(item.value),
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
              return <Anchor>{props.children}</Anchor>;
            }
          },
          {
            strategy: (contentBlock, callback) => {
              const text = contentBlock.getText();

              let matched;
              // tslint:disable-next-line: no-conditional-assignment
              while ((matched = RUBY_REGEX.exec(text)) !== null) {
                const start = matched.index;

                callback(start, start + matched[0].length);
              }
            },
            component: (props: React.HTMLProps<HTMLSpanElement>) => {
              return <Ruby>{props.children}</Ruby>;
            }
          }
        ])
      )
    );

    return (
      <Details onFocus={useCallback(() => onFocus(itemIndex), [itemIndex])}>
        <Summary title={itemIndex.toString()} isOpen={isOpen} onClick={useCallback(() => toggleEditor(s => !s), [])}>
          <PopMenu
            items={[
              <MenuItem
                key="p"
                text="プレビュー (p)"
                onClick={useCallback(() => openDialog("QuestionPreviewer"), [])}
              />,
              <MenuItem
                key="d"
                text="削除 (Delete)"
                onClick={useCallback(() => deleteItem(bufferId, itemIndex), [itemIndex])}
                intent="danger"
              />
            ]}
            hotKeys={{}}
          />
        </Summary>
        <Collapse isOpen={isOpen}>
          <Column padding>
            <Column padding className={Classes.INPUT} style={{ height: "auto", padding: 0 }}>
              <Editor
                editorState={editorState}
                onChange={useCallback(
                  (nextEditorState: EditorState) => {
                    updateItem(bufferId, itemIndex, "value", nextEditorState.getCurrentContent().getPlainText());
                    setEditorState(nextEditorState);
                  },
                  [itemIndex]
                )}
              />
            </Column>
          </Column>
        </Collapse>
      </Details>
    );
  }
);
