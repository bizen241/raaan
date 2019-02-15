import { ButtonGroup, Classes, Collapse } from "@blueprintjs/core";
import * as React from "react";
import { FunctionComponent, RefObject, useCallback, useEffect, useState } from "react";
import { ContentItem } from "../../../../shared/content";
import { Column, Row } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemEditorMenu } from "./item/ContentItemEditorMenu";
import { KanjiItemEditor } from "./item/KanjiItemEditor";
import { TextItemEditor } from "./item/TextItemEditor";

export const ContentItemEditor = React.memo<{
  index: number;
  item: ContentItem;
  isVisible: boolean;
  isFocused: boolean;
  editorRef: RefObject<HTMLButtonElement> | null;
  hotKey: string | undefined;
  onChange: <P extends keyof ContentItem>(index: number, key: P, value: ContentItem[P]) => void;
  onDelete: (index: number) => void;
  onFocus: (index: number) => void;
  onPreview: (index: number) => void;
}>(({ index, item, isVisible, isFocused, editorRef, onChange, onDelete, onFocus, onPreview }) => {
  const [isMenuOpen, toggleMenu] = useState(true);

  const updateItem = useCallback(
    <P extends keyof ContentItem>(key: P, value: ContentItem[P]) => onChange(index, key, value),
    [index]
  );
  const deleteItem = useCallback(() => onDelete(index), [index]);
  const preview = useCallback(() => onPreview(index), [index]);

  useEffect(
    manageHotKey(
      {
        Delete: deleteItem
      },
      isVisible && isFocused
    ),
    [isVisible, isFocused]
  );

  const ItemEditor = editors[item.type];

  return (
    <Column className={`${Classes.TREE} ${Classes.ELEVATION_0}`} onFocus={() => onFocus(index)}>
      <Row>
        <ButtonGroup fill minimal>
          <button
            className={`${Classes.BUTTON} ${Classes.FILL} ${Classes.ALIGN_LEFT}`}
            ref={editorRef}
            onClick={useCallback(() => toggleMenu(s => !s), [])}
          >
            <span className={`${Classes.ICON_STANDARD} bp3-icon-chevron-${isMenuOpen ? "down" : "right"}`} />
            <span className={Classes.BUTTON_TEXT}>{index}</span>
          </button>
          <ContentItemEditorMenu onDelete={deleteItem} onPreview={preview} />
        </ButtonGroup>
      </Row>
      <Collapse isOpen={isMenuOpen}>
        <Column padding="small">
          <ItemEditor item={item} onChange={updateItem} />
        </Column>
      </Collapse>
    </Column>
  );
});

export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface ContentItemEditorProps<T extends ContentItem> {
  item: T;
  onChange: <P extends keyof T>(key: P, value: T[P]) => void;
}

const editors: { [T in ContentItem["type"]]: FunctionComponent<ContentItemEditorProps<any>> } = {
  text: TextItemEditor,
  kanji: KanjiItemEditor,
  code: TextItemEditor,
  math: TextItemEditor
};
