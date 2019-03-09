import { Button, Callout, Divider } from "@blueprintjs/core";
import * as React from "react";
import { connector } from "../../../reducers";
import { contentActions } from "../../../reducers/content";
import { Column } from "../../ui";
import { ContentItemAppendButton } from "./ContentItemAppendButton";
import { ContentItemEditor } from "./ContentItemEditor";
import { ContentItemPreviewer } from "./ContentItemPreviewer";
import { ContentPreviewer } from "./ContentPreviewer";
import { ContentTitleEditor } from "./ContentTitleEditor";

export const ContentEditor = connector(
  (state, { id }: { id: string }) => ({
    id,
    buffer: state.buffers.ContentRevision[id]
  }),
  () => ({
    ...contentActions
  }),
  ({ buffer }) => {
    if (buffer === undefined) {
      return (
        <Column padding>
          <Callout intent="warning" title="バッファが見つかりませんでした" />
        </Column>
      );
    }

    const revision = buffer.edited;
    const { title = "", items = [] } = revision;

    return (
      <Column flex={1}>
        <Column padding>
          <ContentTitleEditor title={title} onChange={updateTitle} />
        </Column>
        <Divider />
        <Column>
          <Column padding>アイテム</Column>
          {items.map((item, index) => (
            <Column key={item.id} padding>
              <ContentItemEditor
                index={index}
                item={item}
                isVisible={isVisible}
                isFocused={index === focusedItemIndex}
                editorRef={index === focusedItemIndex ? focusedItemRef : null}
                hotKey={undefined}
                onChange={updateItem}
                onDelete={onDeleteItem}
                onFocus={focusItem}
                onPreview={onOpenContentItemPreviewer}
              />
            </Column>
          ))}
          <Column padding>
            <ContentItemAppendButton
              selected={itemType}
              appendButtonRef={appendItemButtonRef}
              isVisible={isVisible}
              onAppend={onAppendItem}
              onSelectType={selectItemType}
            />
          </Column>
        </Column>
        <Divider />
        <Column padding>
          <Button large onClick={onOpenContentPreviewer}>
            プレビュー (P)
          </Button>
        </Column>
        <ContentPreviewer content={revision} isOpen={isContentPreviewerOpen} onClose={onCloseContentPreviewer} />
        <ContentItemPreviewer
          item={items[focusedItemIndex]}
          isOpen={isContentItemPreviewerOpen}
          onClose={onCloseContentItemPreviewer}
        />
      </Column>
    );
  }
);
