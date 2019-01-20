import * as React from "react";
import { useEffect, useRef } from "react";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Button, Chars, Column, DottedSeparator, DoubleSeparator, Input, Key, Modal, Row } from "../../ui";
import { createHotKeyHandler, HotKeyMap } from "../../utils/hotKey";
import { ContentPlayer } from "../player/ContentPlayer";
import { ContentItemEditor } from "./ContentItemEditor";
import { ContentItemTypeSelector } from "./ContentItemTypeSelector";

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
    pushItem,
    updateItem,
    deleteItem,
    selectItemType,
    focusItem,
    focusPreviousItem,
    focusNextItem,
    toggleContentPreviewer,
    toggleContentItemMenu
  }) => {
    const {
      data,
      focusedItemIndex,
      selectedItemType,
      isFocusedWithHotKey,
      isContentPreviewerOpened,
      isContentItemPreviewerOpened,
      isContentItemMenuOpened
    } = editor;
    const isVisible = !isContentPreviewerOpened && !isContentItemPreviewerOpened;

    const titleInputRef = useRef<HTMLInputElement>(null);
    const typeSelectRef = useRef<HTMLSelectElement>(null);

    useEffect(() => {
      load(id);
    }, []);
    useEffect(
      () => {
        if (!isVisible) {
          return () => null;
        }

        const shortcutMap: HotKeyMap = {
          a: pushItem,
          k: focusPreviousItem,
          j: focusNextItem,
          p: toggleContentPreviewer,
          s: () => typeSelectRef.current && typeSelectRef.current.focus(),
          t: () => titleInputRef.current && titleInputRef.current.focus()
        };

        const shortcutHandler = createHotKeyHandler(shortcutMap);
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
      <Column flex={1} style={{ overflowY: "auto" }}>
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
        <Column padding="small">
          <DoubleSeparator />
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
                isVisible={isVisible}
                isFocused={index === focusedItemIndex}
                isFocusedWithHotKey={isFocusedWithHotKey}
                hotKey={undefined}
                isMenuOpened={isContentItemMenuOpened}
                onUpdate={updateItem}
                onDelete={deleteItem}
                onFocus={focusItem}
                toggleMenu={toggleContentItemMenu}
              />
            </Column>
          ))}
        </Column>
        <Column padding="small">
          <DottedSeparator />
        </Column>
        <Column>
          <Column center="both">
            <Column />
          </Column>
          <Column padding="small">
            <label>
              <Column>
                <Row center="cross">
                  <Chars size="small">追加するアイテムの種類</Chars>
                  <Key>S</Key>
                </Row>
                <ContentItemTypeSelector
                  selectRef={typeSelectRef}
                  selected={selectedItemType}
                  onChange={selectItemType}
                />
              </Column>
            </label>
          </Column>
          <Column padding="small">
            <Button onClick={() => pushItem()}>
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
        </Column>
        <Modal isOpen={editor.isContentPreviewerOpened} onRequestClose={toggleContentPreviewer} shouldCloseOnEsc={true}>
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
