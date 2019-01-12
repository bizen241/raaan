import * as React from "react";
import { FunctionComponent } from "react";
import { CodeItem, ContentItem, KanjiItem, MathItem, TextItem } from "../../../../shared/content";
import { Button, Column, Details, Row, Summary, TextArea } from "../../ui";

export const ContentItemEditor: FunctionComponent<{
  index: number;
  item: ContentItem;
  isFocused: boolean;
  onUpdate: (index: number, item: ContentItem) => void;
  onDelete: (index: number) => void;
  onFocus: (index: number) => void;
}> = ({ index, item, isFocused, onUpdate, onDelete, onFocus }) => {
  const ItemEditor = editors[item.type];

  return (
    <Details open onFocus={() => onFocus(index)}>
      <Summary>{index}</Summary>
      <Column padding="small">
        <Column padding="small">
          <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(index, textItem)} />
        </Column>
        <Row padding="small">
          <Row padding="small">
            <Button size="small" onClick={() => onDelete(index)} accessKey={isFocused ? "D" : undefined}>
              削除
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
