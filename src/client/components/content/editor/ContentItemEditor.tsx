import * as React from "react";
import { FunctionComponent } from "react";
import { ContentItem, TextItem } from "../../../../shared/content";

export const ContentItemEditor: FunctionComponent<{
  index: number;
  item: ContentItem;
  onUpdate: (index: number, item: ContentItem) => void;
  onDelete: (index: number) => void;
}> = ({ index, item, onUpdate, onDelete }) => {
  const ItemEditor = editors[item.type];

  return (
    <div>
      <ItemEditor item={item} onChange={(textItem: TextItem) => onUpdate(index, textItem)} />
      <button onClick={() => onDelete(index)}>プレビュー</button>
      <button onClick={() => onDelete(index)}>削除</button>
    </div>
  );
};

interface ContentItemEditorProps<T> {
  item: T;
  onChange: (item: T) => void;
}

const TextItemEditor: FunctionComponent<ContentItemEditorProps<TextItem>> = ({ item, onChange }) => {
  return (
    <div>
      <label>
        表示
        <textarea value={item.display} onChange={e => onChange({ ...item, display: e.currentTarget.value })} />
      </label>
      <label>
        入力
        <textarea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
      </label>
    </div>
  );
};

const CodeItemEditor: FunctionComponent<ContentItemEditorProps<TextItem>> = ({ item, onChange }) => {
  return (
    <div>
      <textarea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </div>
  );
};

const MathItemEditor: FunctionComponent<ContentItemEditorProps<TextItem>> = ({ item, onChange }) => {
  return (
    <div>
      <textarea value={item.value} onChange={e => onChange({ ...item, value: e.currentTarget.value })} />
    </div>
  );
};

const editors: { [T in ContentItem["type"]]: FunctionComponent<ContentItemEditorProps<any>> } = {
  text: TextItemEditor,
  code: CodeItemEditor,
  math: MathItemEditor
};
