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
  onChange: (item: ContentItem) => void;
  onDelete: (id: string) => void;
  onFocus: (index: number) => void;
}>(({ index, isVisible, isFocused, editorRef, onChange, onDelete, onFocus, ...props }) => {
  const [isMenuOpen, toggleMenu] = useState(true);
  const [item, setItem] = useState(props.item);

  const updateItem = useCallback((key: string, value: string) => setItem(s => ({ ...s, [key]: value })), []);
  const deleteItem = useCallback(() => onDelete(item.id), []);

  useEffect(() => onChange(item), [item]);
  useEffect(
    manageHotKey(
      {
        Delete: () => onDelete(item.id)
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
          <ContentItemEditorMenu onDelete={deleteItem} />
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

export interface ContentItemEditorProps<T> {
  item: T;
  onChange: (key: string, value: string) => void;
}

const editors: { [T in ContentItem["type"]]: FunctionComponent<ContentItemEditorProps<any>> } = {
  text: TextItemEditor,
  kanji: KanjiItemEditor,
  code: TextItemEditor,
  math: TextItemEditor
};
