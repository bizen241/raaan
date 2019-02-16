import { Button, Divider } from "@blueprintjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { ContentItem } from "../../../../shared/content";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemAppendButton } from "./ContentItemAppendButton";
import { ContentItemEditor } from "./ContentItemEditor";
import { ContentItemPreviewer } from "./ContentItemPreviewer";
import { ContentPreviewer } from "./ContentPreviewer";
import { ContentTitleEditor } from "./ContentTitleEditor";

export const ContentEditor = connector(
  ({ editor: { buffers, itemType } }, { id }: { id: string }) => ({
    id,
    buffer: buffers[id],
    itemType
  }),
  () => ({
    ...editorActions
  }),
  ({ id, buffer, itemType, load, save, updateTitle, updateItem, deleteItem, appendItem, selectItemType }) => {
    useEffect(() => {
      if (buffer === undefined) {
        load(id);
      }
    }, []);

    if (buffer === undefined) {
      return <div>Loading...</div>;
    }

    const appendItemButtonRef = useRef<HTMLButtonElement>(null);

    const [isContentPreviewerOpen, toggleContentPreviewer] = useState(false);
    const [isContentItemPreviewerOpen, toggleContentItemPreviewer] = useState(false);
    const isVisible = !isContentPreviewerOpen && !isContentItemPreviewerOpen;

    const { editedRevision, isSaving } = buffer;

    useEffect(
      manageHotKey(
        {
          P: () => toggleContentPreviewer(true),
          p: () => toggleContentItemPreviewer(true),
          S: () => save(id),
          Escape: () =>
            focusedItemRef.current != null
              ? focusedItemRef.current.focus()
              : appendItemButtonRef.current && appendItemButtonRef.current.focus()
        },
        isVisible
      ),
      [isVisible]
    );

    const focusedItemRef = useRef<HTMLButtonElement>(null);
    const [focusedItemIndex, setFocusedItemIndex] = useState(0);
    const focusItem = useCallback((index: number) => setFocusedItemIndex(index), []);

    const onSave = useCallback(() => save(id), []);

    const onChangeTitle = useCallback((title: string) => updateTitle(id, title), []);
    const onChangeItem = useCallback(
      <P extends keyof ContentItem>(index: number, key: P, value: ContentItem[P]) => updateItem(id, index, key, value),
      []
    );
    const onDeleteItem = useCallback((index: number) => deleteItem(id, index), []);
    const onAppendItem = useCallback(() => appendItem(id), []);

    const onOpenContentPreviewer = useCallback(() => toggleContentPreviewer(true), []);
    const onCloseContentPreviewer = useCallback(() => toggleContentPreviewer(false), []);
    const onOpenContentItemPreviewer = useCallback(() => toggleContentItemPreviewer(true), []);
    const onCloseContentItemPreviewer = useCallback(() => toggleContentItemPreviewer(false), []);

    return (
      <Column flex={1} style={{ overflowY: "auto" }}>
        <Column padding="small">
          <ContentTitleEditor title={editedRevision.title || ""} onChange={onChangeTitle} />
        </Column>
        <Divider />
        <Column>
          <Column padding="small">アイテム</Column>
          {editedRevision.items.map((item, index) => (
            <Column key={item.id} padding="small">
              <ContentItemEditor
                index={index}
                item={item}
                isVisible={isVisible}
                isFocused={index === focusedItemIndex}
                editorRef={index === focusedItemIndex ? focusedItemRef : null}
                hotKey={undefined}
                onChange={onChangeItem}
                onDelete={onDeleteItem}
                onFocus={focusItem}
                onPreview={onOpenContentItemPreviewer}
              />
            </Column>
          ))}
          <Column padding="small">
            <ContentItemAppendButton
              selected={itemType}
              appendButtonRef={appendItemButtonRef}
              onAppend={onAppendItem}
              onSelectType={selectItemType}
            />
          </Column>
        </Column>
        <Divider />
        <Column padding="small">
          <Button large onClick={onOpenContentPreviewer}>
            プレビュー (P)
          </Button>
        </Column>
        <Column padding="small">
          <Button large loading={isSaving} intent="success" onClick={onSave}>
            アップロード (S)
          </Button>
        </Column>
        <ContentPreviewer content={editedRevision} isOpen={isContentPreviewerOpen} onClose={onCloseContentPreviewer} />
        <ContentItemPreviewer
          item={editedRevision.items[focusedItemIndex]}
          isOpen={isContentItemPreviewerOpen}
          onClose={onCloseContentItemPreviewer}
        />
      </Column>
    );
  }
);
