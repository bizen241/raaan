import { Button, ButtonGroup, Classes, Collapse, Menu, MenuItem, Popover } from "@blueprintjs/core";
import * as React from "react";
import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import TextArea from "react-textarea-autosize";
import { CodeItem, ContentItem, KanjiItem, MathItem, TextItem } from "../../../../shared/content";
import { Column, Row } from "../../ui";
import { createHotKeyHandler, HotKeyMap } from "../../utils/hotKey";

export const ContentItemEditor: FunctionComponent<{
  index: number;
  item: ContentItem;
  isVisible: boolean;
  isFocused: boolean;
  isFocusedWithHotKey: boolean;
  hotKey: string | undefined;
  onUpdate: (index: number, item: ContentItem) => void;
  onDelete: (id: string) => void;
  onFocus: (index: number) => void;
}> = ({ index, item, isVisible, isFocused, isFocusedWithHotKey, onUpdate, onDelete, onFocus }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [isOpen, toggle] = useState(true);

  useEffect(() => {
    if (isFocused && ref.current != null) {
      ref.current.focus();
    }
  }, []);
  useEffect(
    () => {
      if (isFocused && isFocusedWithHotKey && ref.current != null) {
        ref.current.focus();
      }
    },
    [isFocused]
  );
  useEffect(
    () => {
      if (!isVisible || !isFocused) {
        return;
      }

      const shortcutMap: HotKeyMap = {
        Escape: () => ref.current && ref.current.focus(),
        Delete: () => onDelete(item.id)
      };

      const shortcutHandler = createHotKeyHandler(shortcutMap);
      document.addEventListener("keydown", shortcutHandler);
      return () => {
        document.removeEventListener("keydown", shortcutHandler);
      };
    },
    [isVisible, isFocused]
  );

  const ItemEditor = editors[item.type];

  return (
    <Column className={`${Classes.TREE} ${Classes.ELEVATION_0}`} onFocus={() => onFocus(index)}>
      <Row>
        <ButtonGroup fill minimal>
          <button
            className={`${Classes.BUTTON} ${Classes.FILL} ${Classes.ALIGN_LEFT}`}
            ref={ref}
            onClick={useCallback(() => toggle(s => !s), [])}
          >
            <span className={`${Classes.ICON_STANDARD} bp3-icon-chevron-${isOpen ? "down" : "right"}`} />
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
      <Collapse isOpen={isOpen}>
        <Column padding="small">
          <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(index, textItem)} />
        </Column>
      </Collapse>
    </Column>
  );
};

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
