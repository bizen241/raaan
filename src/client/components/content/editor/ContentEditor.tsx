import * as React from "react";
import { useEffect, useRef } from "react";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Button, Chars, Column, Input, Key, Modal, Row } from "../../ui";
import { createShortcutHandler, ShortcutMap } from "../../utils/shortcut";
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
  ({
    id,
    editor,
    load,
    updateTitle,
    addItem,
    updateItem,
    deleteItem,
    focusItem,
    focusPreviousItem,
    focusNextItem,
    toggleContentPreviewer
  }) => {
    const {
      data,
      focusedItemIndex,
      isFocusedWithHotKey,
      isOpenedContentPreviewer,
      isOpenedContentItemPreviewer
    } = editor;
    const isVisible = !isOpenedContentPreviewer && !isOpenedContentItemPreviewer;

    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      load(id);
    }, []);
    useEffect(
      () => {
        if (!isVisible) {
          return () => null;
        }

        const shortcutMap: ShortcutMap = {
          k: focusPreviousItem,
          j: focusNextItem,
          p: toggleContentPreviewer,
          t: () => titleInputRef.current && titleInputRef.current.focus()
        };

        const shortcutHandler = createShortcutHandler(shortcutMap);
        document.addEventListener("keydown", shortcutHandler);
        return () => {
          document.removeEventListener("keydown", shortcutHandler);
        };
      },
      [isVisible]
    );

    if (id !== editor.id) {
      return <div>Loading...</div>;
    }

    return (
      <Column flex={1}>
        <Column padding="small">
          <label>
            <Column>
              <Row center="cross">
                <Chars size="small">タイトル</Chars>
                <Key>T</Key>
              </Row>
              <Input value={data.title} ref={titleInputRef} onChange={e => updateTitle(e.currentTarget.value)} />
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
                isFocusedWithHotKey={isFocusedWithHotKey}
                isVisible={isVisible}
                hotKey={undefined}
                onUpdate={updateItem}
                onDelete={deleteItem}
                onFocus={focusItem}
              />
            </Column>
          ))}
        </Column>
        <Column padding="small">
          <Button onClick={() => addItem(data.items.length, "kanji")}>
            追加
            <Key>A</Key>
          </Button>
        </Column>
        <Column padding="small">
          <Button onClick={toggleContentPreviewer}>
            プレビュー
            <Key>P</Key>
          </Button>
        </Column>
        <Modal isOpen={editor.isOpenedContentPreviewer} onRequestClose={toggleContentPreviewer} shouldCloseOnEsc={true}>
          <Column padding="small" flex={1}>
            <Column flex={1}>
              <ContentPlayer data={data} />
            </Column>
            <Button size="small" onClick={toggleContentPreviewer}>
              閉じる
              <Key>Esc</Key>
            </Button>
          </Column>
        </Modal>
      </Column>
    );
  }
);
