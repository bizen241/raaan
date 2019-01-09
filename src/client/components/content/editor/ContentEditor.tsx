import * as React from "react";
import { useEffect } from "react";
import { createTextItem } from "../../../domain/content";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Button, Column, Input } from "../../ui";
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
      <Column>
        <Column padding="small">
          <label>
            <Column>
              <span>タイトル</span>
              <Input value={data.title} onChange={e => updateTitle(e.currentTarget.value)} />
            </Column>
          </label>
        </Column>
        <Column padding="small">
          <label>アイテム</label>
          {data.items.map((item, index) => (
            <ContentItemEditor key={item.id} index={index} item={item} onUpdate={updateItem} onDelete={deleteItem} />
          ))}
        </Column>
        <Column padding="small">
          <Button onClick={() => addItem(data.items.length, createTextItem())}>追加</Button>
        </Column>
        <Column padding="small">
          <Button onClick={toggleContentPreviewer}>プレビュー</Button>
        </Column>
        {editor.isOpenedContentPreviewer ? (
          <Column padding="small">
            <ContentPlayer data={data} />
          </Column>
        ) : null}
      </Column>
    );
  }
);
