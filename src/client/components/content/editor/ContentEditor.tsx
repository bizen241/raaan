import { Button, Callout, Classes, ControlGroup, Divider } from "@blueprintjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { ContentItem } from "../../../../shared/content";
import { contentActions } from "../../../actions/content";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemPreviewer } from "../previewer/ContentItemPreviewer";
import { ContentPreviewer } from "../previewer/ContentPreviewer";
import { contentItemTypeToLabel } from "./item";
import { ContentItemEditor } from "./item/ContentItemEditor";

export const ContentEditor = connector(
  (state, { bufferId }: { bufferId: string }) => ({
    bufferId,
    buffer: state.buffers.ContentRevision[bufferId],
    status: state.api.upload.ContentRevision[bufferId],
    isVisible: state.dialog.name == null
  }),
  () => ({
    ...contentActions,
    openDialog: dialogActions.open
  }),
  ({ bufferId, buffer, status, isVisible, updateTitle, appendItem, openDialog }) => {
    if (buffer === undefined) {
      return (
        <Column padding>
          <Callout intent="warning" title="バッファが見つかりませんでした" />
        </Column>
      );
    }

    const { title, items = [] } = buffer.edited;

    const titleInputRef = useRef<HTMLInputElement>(null);
    const itemTypeSelectorRef = useRef<HTMLSelectElement>(null);
    const appendButtonRef = useRef<HTMLButtonElement>(null);

    const [focusedItemIndex, focus] = useState(0);
    const [selectedItemType, selectItemType] = useState(items.length !== 0 ? items[items.length - 1].type : "text");

    useEffect(
      manageHotKey(
        {
          t: () => titleInputRef.current && titleInputRef.current.focus(),
          s: () => itemTypeSelectorRef.current && itemTypeSelectorRef.current.focus(),
          a: () => appendButtonRef.current && appendButtonRef.current.click()
        },
        isVisible
      ),
      [isVisible]
    );

    if (status === 200) {
      return (
        <Column padding>
          <Callout intent="success" title="アップロードが完了しました" />
        </Column>
      );
    }
    if (status === 202) {
      return (
        <Column padding>
          <Callout intent="primary" title="アップロード中です" />
        </Column>
      );
    }

    return (
      <Column flex={1}>
        <Column padding>
          <label className={Classes.LABEL}>
            タイトル (t)
            <Column>
              <input
                className={Classes.INPUT}
                defaultValue={title}
                ref={titleInputRef}
                onChange={useCallback(
                  (e: React.ChangeEvent<HTMLInputElement>) => updateTitle(bufferId, e.target.value),
                  []
                )}
              />
            </Column>
          </label>
        </Column>
        <Divider />
        <Column>
          <Column padding>アイテム</Column>
          {items.map((item, index) => (
            <Column key={item.id} padding>
              <ContentItemEditor bufferId={bufferId} itemIndex={index} item={item} onFocus={focus} />
            </Column>
          ))}
          <Column padding>
            <ControlGroup fill>
              <div className={`${Classes.SELECT} ${Classes.FIXED} ${Classes.LARGE}`}>
                <select
                  value={selectedItemType}
                  ref={itemTypeSelectorRef}
                  onChange={useCallback(
                    (e: React.ChangeEvent<HTMLSelectElement>) => selectItemType(e.target.value as ContentItem["type"]),
                    []
                  )}
                >
                  {Object.entries(contentItemTypeToLabel).map(([itemType, label]) => (
                    <option key={itemType} value={itemType}>
                      {label} {itemType === selectedItemType ? "(s)" : null}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className={`${Classes.BUTTON} ${Classes.LARGE} ${Classes.INTENT_PRIMARY}`}
                autoFocus
                onClick={useCallback(() => appendItem(bufferId, selectedItemType), [selectedItemType])}
                ref={appendButtonRef}
              >
                追加 (a)
              </button>
            </ControlGroup>
          </Column>
        </Column>
        <Divider />
        <Column padding>
          <Button large onClick={useCallback(() => openDialog("ContentPreviewer"), [])}>
            プレビュー (P)
          </Button>
        </Column>
        <ContentPreviewer params={buffer.edited} />
        <ContentItemPreviewer item={items[focusedItemIndex]} />
      </Column>
    );
  }
);
