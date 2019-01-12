import * as React from "react";
import { useEffect } from "react";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Button, Chars, Column, Input, Key, Modal, Row } from "../../ui";
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
  ({ id, editor, load, updateTitle, addItem, updateItem, deleteItem, focusItem, toggleContentPreviewer }) => {
    useEffect(() => {
      load(id);
    }, []);

    if (id !== editor.id) {
      return <div>Loading...</div>;
    }

    const { data, focusedItemIndex } = editor;

    return (
      <Column>
        <Column padding="small">
          <label>
            <Column>
              <Row center="cross">
                <Row padding="small">
                  <Chars size="small">タイトル</Chars>
                </Row>
                <Key>T</Key>
              </Row>
              <Input value={data.title} accessKey="T" onChange={e => updateTitle(e.currentTarget.value)} />
            </Column>
          </label>
        </Column>
        <Column>
          <Column padding="small">
            <Chars size="small">アイテム</Chars>
          </Column>
          {data.items.map((item, index) => (
            <Column key={item.id} padding="small">
              <ContentItemEditor
                index={index}
                item={item}
                isFocused={index === focusedItemIndex}
                onUpdate={updateItem}
                onDelete={deleteItem}
                onFocus={focusItem}
              />
            </Column>
          ))}
        </Column>
        <Column padding="small">
          <Button onClick={() => addItem(data.items.length, "kanji")} accessKey="A">
            追加
          </Button>
        </Column>
        <Column padding="small">
          <Button onClick={toggleContentPreviewer} accessKey="P">
            プレビュー
          </Button>
        </Column>
        <Modal isOpen={editor.isOpenedContentPreviewer} onRequestClose={toggleContentPreviewer} shouldCloseOnEsc={true}>
          <Column padding="small" flex={1}>
            <Column flex={1}>
              <ContentPlayer data={data} />
            </Column>
            <Button size="small" onClick={toggleContentPreviewer} accessKey="W">
              閉じる
            </Button>
          </Column>
        </Modal>
      </Column>
    );
  }
);
