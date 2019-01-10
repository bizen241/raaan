import * as React from "react";
import { FunctionComponent } from "react";
import { CodeItem, ContentItem, KanjiItem, MathItem, TextItem } from "../../../../shared/content";
import { Button, Column, Row, TextArea } from "../../ui";

export const ContentItemEditor: FunctionComponent<{
  index: number;
  item: ContentItem;
  onUpdate: (index: number, item: ContentItem) => void;
  onDelete: (index: number) => void;
}> = ({ index, item, onUpdate, onDelete }) => {
  const ItemEditor = editors[item.type];

  return (
    <Column>
      <Column padding="small">
        <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(index, textItem)} />
      </Column>
      <Row padding="small">
        <Button size="small" onClick={() => onDelete(index)}>
          プレビュー
        </Button>
        <Button size="small" onClick={() => onDelete(index)}>
          削除
        </Button>
      </Row>
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
