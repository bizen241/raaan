import { Button, ButtonGroup, Classes, Collapse, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";
import { FunctionComponent, RefObject, useCallback, useEffect, useState } from "react";
import TextArea from "react-textarea-autosize";
import { CodeItem, ContentItem, KanjiItem, MathItem, TextItem } from "../../../../shared/content";
import { Column, Row } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";

export const ContentItemEditor = React.memo<{
  index: number;
  item: ContentItem;
  isVisible: boolean;
  isFocused: boolean;
  editorRef: RefObject<HTMLButtonElement> | null;
  hotKey: string | undefined;
  onUpdate: (id: string, item: ContentItem) => void;
  onDelete: (id: string) => void;
  onFocus: (index: number) => void;
}>(({ index, item, isVisible, isFocused, editorRef, onUpdate, onDelete, onFocus }) => {
  const [isMenuOpen, toggleMenu] = useState(true);

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
          <Popover
            content={
              <Menu>
                <MenuItem text="削除 (D)" onClick={() => onDelete(item.id)} />
              </Menu>
            }
          >
            <Button>⋮</Button>
          </Popover>
        </ButtonGroup>
      </Row>
      <Collapse isOpen={isMenuOpen}>
        <Column padding="small">
          <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(item.id, textItem)} />
        </Column>
      </Collapse>
    </Column>
  );
});

interface ContentItemEditorProps<T> {
  item: T;
  onChange: (item: T) => void;
}

const TextItemEditor: FunctionComponent<ContentItemEditorProps<TextItem>> = ({ item, onChange }) => {
  return (
    <Column>
      <TextArea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </Column>
  );
};

const KanjiItemEditor: FunctionComponent<ContentItemEditorProps<KanjiItem>> = ({ item, onChange }) => {
  return (
    <Column>
      <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
        漢字
        <Column>
          <TextArea
            className={`${Classes.INPUT} ${Classes.MODIFIER_KEY}`}
            value={item.kanji}
            onChange={e => onChange({ ...item, kanji: e.currentTarget.value })}
          />
        </Column>
      </label>
      <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
        かな
        <Column>
          <TextArea
            className={`${Classes.INPUT} ${Classes.MODIFIER_KEY}`}
            value={item.value}
            onChange={e => onChange({ ...item, value: e.currentTarget.value })}
          />
        </Column>
      </label>
    </Column>
  );
};

const CodeItemEditor: FunctionComponent<ContentItemEditorProps<CodeItem>> = ({ item, onChange }) => {
  return (
    <Column>
      <TextArea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </Column>
  );
};

const MathItemEditor: FunctionComponent<ContentItemEditorProps<MathItem>> = ({ item, onChange }) => {
  return (
    <Column>
      <TextArea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </Column>
  );
};

const editors: { [T in ContentItem["type"]]: FunctionComponent<ContentItemEditorProps<any>> } = {
  text: TextItemEditor,
  kanji: KanjiItemEditor,
  code: CodeItemEditor,
  math: MathItemEditor
};
