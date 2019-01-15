import * as React from "react";
import { FunctionComponent, useEffect, useRef } from "react";
import { CodeItem, ContentItem, KanjiItem, MathItem, TextItem } from "../../../../shared/content";
import { Button, Chars, Column, Details, Key, Menu, Row, Summary, TextArea } from "../../ui";
import { createHotKeyHandler, HotKeyMap } from "../../utils/hotKey";

export const ContentItemEditor: FunctionComponent<{
  index: number;
  item: ContentItem;
  isVisible: boolean;
  isFocused: boolean;
  isFocusedWithHotKey: boolean;
  hotKey: string | undefined;
  isMenuOpened: boolean;
  onUpdate: (index: number, item: ContentItem) => void;
  onDelete: (id: string) => void;
  onFocus: (index: number) => void;
  toggleMenu: () => void;
}> = ({
  index,
  item,
  isVisible,
  isFocused,
  isFocusedWithHotKey,
  isMenuOpened,
  hotKey,
  onUpdate,
  onDelete,
  onFocus,
  toggleMenu
}) => {
  const summaryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isFocused && summaryRef.current != null) {
      summaryRef.current.focus();
    }
  }, []);
  useEffect(
    () => {
      if (isFocused && isFocusedWithHotKey && summaryRef.current != null) {
        summaryRef.current.focus();
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
        m: () => toggleMenu(),
        Escape: () => summaryRef.current && summaryRef.current.focus(),
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
    <Details open onFocus={() => onFocus(index)}>
      <Summary ref={summaryRef}>
        <Row center="cross" flex={1} padding="small" style={{ position: "relative" }}>
          {index}
          <Row flex={1} />
          {hotKey !== undefined ? <Key>{hotKey}</Key> : null}
          <Button
            size="small"
            onClick={e => {
              e.preventDefault();
              toggleMenu();
            }}
          >
            ⋮{isFocused ? <Key>M</Key> : null}
          </Button>
          {isFocused && isMenuOpened ? (
            <Menu padding="small">
              <Row>
                <Row flex={1} />
                <Button size="small" onClick={() => onDelete(item.id)}>
                  削除<Key>D</Key>
                </Button>
              </Row>
            </Menu>
          ) : null}
        </Row>
      </Summary>
      <Column padding="small">
        <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(index, textItem)} />
      </Column>
    </Details>
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
      <Column>
        <Row center="cross">
          <Chars size="small">漢字</Chars>
        </Row>
        <TextArea
          placeholder="漢字"
          value={item.kanji}
          onChange={e => onChange({ ...item, kanji: e.currentTarget.value })}
        />
      </Column>
      <Column>
        <Row center="cross">
          <Chars size="small">かな</Chars>
        </Row>
        <TextArea
          placeholder="かな"
          value={item.value}
          onChange={e => onChange({ ...item, value: e.currentTarget.value })}
        />
      </Column>
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
