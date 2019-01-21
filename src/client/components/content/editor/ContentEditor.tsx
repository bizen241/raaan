import { Button, Classes, Dialog } from "@blueprintjs/core";
import * as React from "react";
import { useEffect, useRef } from "react";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Column } from "../../ui";
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
    toggleContentPreviewer
  }) => {
    const {
      data,
      focusedItemIndex,
      selectedItemType,
      isFocusedWithHotKey,
      isContentPreviewerOpened,
      isContentItemPreviewerOpened
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

    const itemEditors = data.items.map((item, index) => (
      <Column key={item.id} padding="small">
        <ContentItemEditor
          index={index}
          item={item}
          isVisible={isVisible}
          isFocused={index === focusedItemIndex}
          isFocusedWithHotKey={isFocusedWithHotKey}
          hotKey={undefined}
          onUpdate={updateItem}
          onDelete={deleteItem}
          onFocus={focusItem}
        />
      </Column>
    ));

    return (
      <Column flex={1} style={{ overflowY: "auto" }}>
        <Column padding="small">
          <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
            タイトル (T)
            <Column>
              <input
                className={Classes.INPUT}
                value={data.title}
                ref={titleInputRef}
                onChange={e => updateTitle(e.currentTarget.value)}
              />
            </Column>
          </label>
        </Column>
        <Column>
          <Column padding="small">アイテム</Column>
          {itemEditors}
        </Column>
        <Column>
          <Column padding="small">
            <label className={`${Classes.LABEL} ${Classes.MODIFIER_KEY}`}>
              追加するアイテムの種類 (S)
              <Column>
                <ContentItemTypeSelector
                  selectRef={typeSelectRef}
                  selected={selectedItemType}
                  onChange={selectItemType}
                />
              </Column>
            </label>
          </Column>
          <Column padding="small">
            <Button onClick={pushItem}>追加 (A)</Button>
          </Column>
          <Column padding="small">
            <Button onClick={toggleContentPreviewer}>プレビュー (P)</Button>
          </Column>
        </Column>
        <Dialog
          isOpen={editor.isContentPreviewerOpened}
          onClose={toggleContentPreviewer}
          style={{ width: "95vw", height: "95vh", margin: 0, padding: 0 }}
          className="bp3-dark"
        >
          <Column className={Classes.DIALOG_BODY} padding="small" flex={1}>
            <Column flex={1}>
              <ContentPlayer data={data} />
            </Column>
            <Button onClick={toggleContentPreviewer}>閉じる (Esc)</Button>
          </Column>
        </Dialog>
      </Column>
    );
  }
);
