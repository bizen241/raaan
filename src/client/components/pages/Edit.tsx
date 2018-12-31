import * as React from "react";
import { useEffect } from "react";
import { createTextItem } from "../../domain/content";
import { connector } from "../../reducers";
import { editorActions } from "../../reducers/editor";
import { ContentItemEditor } from "../editor";
import { PageProps } from "../project/Router";

export const Edit = connector(
  (state, ownProps: PageProps) => ({
    id: ownProps.match.params.id,
    data: state.editor.data
  }),
  () => ({
    ...editorActions
  }),
  ({ id, data, load, updateTitle, addItem, updateItem, deleteItem }) => {
    useEffect(() => {
      load(id);
    }, []);

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
      </div>
    );
  }
);
