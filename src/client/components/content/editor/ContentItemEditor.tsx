import * as React from "react";
import { FunctionComponent, useEffect, useRef } from "react";
import { CodeItem, ContentItem, KanjiItem, MathItem, TextItem } from "../../../../shared/content";
import { Button, Column, Details, Key, Row, Summary, TextArea } from "../../ui";

export const ContentItemEditor: FunctionComponent<{
  index: number;
  item: ContentItem;
  isFocused: boolean;
  isFocusedWithHotKey: boolean;
  hotKey: string | undefined;
  onUpdate: (index: number, item: ContentItem) => void;
  onDelete: (index: number) => void;
  onFocus: (index: number) => void;
}> = ({ index, item, isFocused, isFocusedWithHotKey, hotKey, onUpdate, onDelete, onFocus }) => {
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

  const ItemEditor = editors[item.type];

  return (
    <Details open onFocus={() => onFocus(index)}>
      <Summary ref={summaryRef}>
        <Row center="cross" flex={1} padding="small">
          {index}
          <Row flex={1} />
          {hotKey !== undefined ? <Key>{hotKey}</Key> : null}
        </Row>
      </Summary>
      <Column padding="small">
        <Column padding="small">
          <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(index, textItem)} />
        </Column>
        <Row padding="small">
          <Row padding="small">
            <Button size="small" onClick={() => onDelete(index)}>
              削除
              {isFocused ? <Key>D</Key> : null}
            </Button>
          </Row>
        </Row>
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
        <TextArea
          placeholder="漢字"
          value={item.kanji}
          onChange={e => onChange({ ...item, kanji: e.currentTarget.value })}
        />
      </Column>
      <Column>
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
