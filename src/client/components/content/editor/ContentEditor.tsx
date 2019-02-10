import { Button } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { ContentItem } from "../../../../shared/content";
import { connector } from "../../../reducers";
import { editorActions } from "../../../reducers/editor";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemsEditor } from "./ContentItemsEditor";
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
  ({ id, buffer, itemType, load, updateTitle, updateItem, deleteItem, appendItem, selectItemType }) => {
    const [isContentPreviewerOpen, toggleContentPreviewer] = useState(false);
    const [isContentItemPreviewerOpen, toggleContentItemPreviewer] = useState(false);
    const isVisible = !isContentPreviewerOpen && !isContentItemPreviewerOpen;

    useEffect(() => {
      if (buffer === undefined) {
        load(id);
      }
    }, []);

    if (buffer === undefined) {
      return <div>Loading...</div>;
    }

    const { editedRevision } = buffer;

    useEffect(
      manageHotKey(
        {
          P: () => toggleContentPreviewer(true),
          p: () => toggleContentItemPreviewer(true)
        },
        isVisible
      ),
      [isVisible]
    );

    const onChangeTitle = useCallback((title: string) => updateTitle(id, title), []);
    const onChangeItem = useCallback(
      <P extends keyof ContentItem>(index: number, key: P, value: ContentItem[P]) => updateItem(id, index, key, value),
      []
    );
    const onDeleteItem = useCallback((index: number) => deleteItem(id, index), []);
    const onAppendItem = useCallback(() => appendItem(id), []);

    const onOpenContentPreviewer = useCallback(() => toggleContentPreviewer(true), []);
    const onCloseContentPreviewer = useCallback(() => toggleContentPreviewer(false), []);

    return (
      <Column flex={1} style={{ overflowY: "auto" }}>
        <Column padding="small">
          <ContentTitleEditor title={editedRevision.title || ""} onChange={onChangeTitle} />
        </Column>
        <Column>
          <ContentItemsEditor
            items={editedRevision.items || []}
            isVisible={isVisible}
            selectedItemType={itemType}
            onSelectItemType={selectItemType}
            onChange={onChangeItem}
            onDelete={onDeleteItem}
            onAppend={onAppendItem}
          />
        </Column>
        <Column padding="small">
          <Button onClick={onOpenContentPreviewer}>プレビュー (P)</Button>
        </Column>
        <ContentPreviewer content={editedRevision} isOpen={isContentPreviewerOpen} onClose={onCloseContentPreviewer} />
      </Column>
    );
  }
);
