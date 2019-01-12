import * as React from "react";
import { useEffect } from "react";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Button, Chars, Column, Input, Modal } from "../../ui";
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
              <Chars size="small">タイトル</Chars>
              <Input value={data.title} onChange={e => updateTitle(e.currentTarget.value)} />
            </Column>
          </label>
        </Column>
        <Column>
          <Column padding="small">
            <Chars size="small">アイテム</Chars>
          </Column>
          {data.items.map((item, index) => (
            <Column key={item.id} padding="small">
              <ContentItemEditor index={index} item={item} onUpdate={updateItem} onDelete={deleteItem} />
            </Column>
          ))}
        </Column>
        <Column padding="small">
          <Button onClick={() => addItem(data.items.length, "kanji")}>追加</Button>
        </Column>
        <Column padding="small">
          <Button onClick={toggleContentPreviewer}>プレビュー</Button>
        </Column>
        <Modal isOpen={editor.isOpenedContentPreviewer} onRequestClose={toggleContentPreviewer} shouldCloseOnEsc={true}>
          <Column padding="small" flex={1}>
            <Column flex={1}>
              <ContentPlayer data={data} />
            </Column>
            <Button size="small" onClick={toggleContentPreviewer}>
              閉じる
            </Button>
          </Column>
        </Modal>
      </Column>
    );
  }
);
