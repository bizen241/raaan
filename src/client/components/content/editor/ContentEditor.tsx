import { Button } from "@blueprintjs/core";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { connector } from "../../../reducers";
import { bufferActions } from "../../../reducers/buffer";
import { editorActions } from "../../../reducers/editor";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemsEditor } from "./ContentItemsEditor";
import { ContentPreviewer } from "./ContentPreviewer";
import { ContentTitleEditor } from "./ContentTitleEditor";

export const ContentEditor = connector(
  ({ editor }, { id }: { id: string }) => ({
    id,
    ...editor
  }),
  () => ({
    persist: bufferActions.update,
    ...editorActions
  }),
  ({
    id,
    editedRevision,
    itemType,
    load,
    save,
    updateTitle,
    updateItem,
    deleteItem,
    appendItem,
    selectItemType
    // selectItemLang,
    // selectTextLang,
    // selectCodeLang
  }) => {
    const [isContentPreviewerOpen, toggleContentPreviewer] = useState(false);
    const [isContentItemPreviewerOpen, toggleContentItemPreviewer] = useState(false);
    const isVisible = !isContentPreviewerOpen && !isContentItemPreviewerOpen;

    useEffect(() => {
      if (editedRevision.contentId !== id) {
        load(id);
      }

      return () => save();
    }, []);

    if (editedRevision.contentId !== id) {
      return <div>Loading...</div>;
    }

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

    const openContentPreviewer = useCallback(() => toggleContentPreviewer(true), []);
    const closeContentPreviewer = useCallback(() => toggleContentPreviewer(false), []);

    return (
      <Column flex={1} style={{ overflowY: "auto" }}>
        <Column padding="small">
          <ContentTitleEditor title={editedRevision.title || ""} onChange={updateTitle} />
        </Column>
        <Column>
          <ContentItemsEditor
            items={editedRevision.items || []}
            isVisible={isVisible}
            selectedItemType={itemType}
            onSelectItemType={selectItemType}
            onChange={updateItem}
            onDelete={deleteItem}
            onAppend={appendItem}
          />
        </Column>
        <Column padding="small">
          <Button onClick={openContentPreviewer}>プレビュー (P)</Button>
        </Column>
        <ContentPreviewer content={editedRevision} isOpen={isContentPreviewerOpen} onClose={closeContentPreviewer} />
      </Column>
    );
  }
);
