import { Button } from "@blueprintjs/core";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { ContentItem } from "../../../../shared/content";
import { connector } from "../../../reducers";
import { bufferActions } from "../../../reducers/buffer";
import { editorActions } from "../../../reducers/editor";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemsEditor } from "./ContentItemsEditor";
import { ContentPreviewer } from "./ContentPreviewer";
import { ContentTitleEditor } from "./ContentTitleEditor";

export const ContentEditor = connector(
  ({ editor: { buffer, ...settings } }, { id }: { id: string }) => ({
    id,
    data: buffer[id],
    ...settings
  }),
  () => ({
    persist: bufferActions.update,
    ...editorActions
  }),
  ({
    id,
    itemType,
    // itemLang,
    // textLang,
    // codeLang,
    load,
    update,
    save,
    selectItemType,
    // selectItemLang,
    // selectTextLang,
    // selectCodeLang
    ...props
  }) => {
    const [isContentPreviewerOpen, toggleContentPreviewer] = useState(false);
    const [isContentItemPreviewerOpen, toggleContentItemPreviewer] = useState(false);
    const isVisible = !isContentPreviewerOpen && !isContentItemPreviewerOpen;

    useEffect(() => {
      load(id);

      return () => save(id);
    }, []);

    if (props.data === undefined) {
      return <div>Loading...</div>;
    }

    const [data, setData] = useState(props.data);

    useEffect(
      () => {
        update(id, data);
      },
      [data]
    );

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

    const updateTitle = useCallback((title: string) => setData(s => ({ ...s, title })), []);
    const updateItems = useCallback((items: ContentItem[]) => setData(s => ({ ...s, items })), []);

    const openContentPreviewer = useCallback(() => toggleContentPreviewer(true), []);
    const closeContentPreviewer = useCallback(() => toggleContentPreviewer(false), []);

    return (
      <Column flex={1} style={{ overflowY: "auto" }}>
        <Column padding="small">
          <ContentTitleEditor title={data.title} onChange={updateTitle} />
        </Column>
        <Column>
          <ContentItemsEditor
            items={data.items}
            isVisible={isVisible}
            selectedItemType={itemType}
            onChange={updateItems}
            onSelectItemType={selectItemType}
          />
        </Column>
        <Column padding="small">
          <Button onClick={openContentPreviewer}>プレビュー (P)</Button>
        </Column>
        <ContentPreviewer data={data} isOpen={isContentPreviewerOpen} onClose={closeContentPreviewer} />
      </Column>
    );
  }
);
