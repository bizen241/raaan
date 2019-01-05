import * as React from "react";
import { useEffect } from "react";
import { createTextItem } from "../../../domain/content";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { ContentPlayer } from "../player/ContentPlayer";
import { ContentItemEditor } from "./ContentItemEditor";

export const ContentEditor = connector(
  (state, ownProps: { id: string }) => ({
    id: ownProps.id,
    editor: state.editor
  }),
  () => ({
    ...editorActions
  }),
  ({ id, editor, load, updateTitle, addItem, updateItem, deleteItem, toggleContentPreviewer }) => {
    useEffect(() => {
      load(id);
    }, []);

    if (id !== editor.id) {
      return <div>Loading...</div>;
    }

    const { data } = editor;

    return (
      <div>
        <div>
          <label>
            タイトル
            <input value={data.title} onChange={e => updateTitle(e.currentTarget.value)} />
          </label>
        </div>
        <label>アイテム</label>
        {data.items.map((item, index) => (
          <ContentItemEditor key={item.id} index={index} item={item} onUpdate={updateItem} onDelete={deleteItem} />
        ))}
        <button onClick={() => addItem(data.items.length, createTextItem())}>追加</button>
        <button onClick={toggleContentPreviewer}>プレビュー</button>
        {editor.isOpenedContentPreviewer ? <ContentPlayer data={data} /> : null}
      </div>
    );
  }
);
