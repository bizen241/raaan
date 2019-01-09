import * as React from "react";
import { FunctionComponent } from "react";
import { ContentItem, TextItem } from "../../../../shared/content";
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
      <label>
        <Column>
          表語
          <TextArea value={item.display} onChange={e => onChange({ ...item, display: e.currentTarget.value })} />
        </Column>
      </label>
      <label>
        <Column>
          表音
          <TextArea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
        </Column>
      </label>
    </Column>
  );
};

const CodeItemEditor: FunctionComponent<ContentItemEditorProps<TextItem>> = ({ item, onChange }) => {
  return (
    <div>
      <TextArea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </div>
  );
};

const MathItemEditor: FunctionComponent<ContentItemEditorProps<TextItem>> = ({ item, onChange }) => {
  return (
    <div>
      <TextArea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </div>
  );
};

const editors: { [T in ContentItem["type"]]: FunctionComponent<ContentItemEditorProps<any>> } = {
  text: TextItemEditor,
  code: CodeItemEditor,
  math: MathItemEditor
};
