import { Collapse, MenuItem, Tag } from "@blueprintjs/core";
import * as React from "react";
import { useCallback, useState } from "react";
import { contentItemEditors, contentItemTypeToLabel } from ".";
import { ContentItem } from "../../../../../shared/content";
import { contentActions } from "../../../../actions/content";
import { connector } from "../../../../reducers";
import { dialogActions } from "../../../../reducers/dialog";
import { Column, Details, PopMenu, Summary } from "../../../ui";

export const ContentItemEditor = connector(
  (
    _,
    ownProps: {
      bufferId: string;
      itemIndex: number;
      item: ContentItem;
      onFocus: (itemIndex: number) => void;
    }
  ) => ({
    ...ownProps
  }),
  () => ({
    ...contentActions,
    openDialog: dialogActions.open
  }),
  ({ bufferId, item, itemIndex, updateItem, deleteItem, openDialog, onFocus }) => {
    const [isOpen, toggleEditor] = useState(true);

    const ItemEditor = contentItemEditors[item.type];

    return (
      <Details onFocus={useCallback(() => onFocus(itemIndex), [itemIndex])}>
        <Summary title={itemIndex} onClick={useCallback(() => toggleEditor(s => !s), [])}>
          <Tag minimal>{contentItemTypeToLabel[item.type]}</Tag>
          <PopMenu
            items={[
              <MenuItem
                key="p"
                text="プレビュー (p)"
                onClick={useCallback(() => openDialog("ContentItemPreviewer"), [])}
              />,
              <MenuItem
                key="d"
                text="削除 (Delete)"
                onClick={useCallback(() => deleteItem(bufferId, itemIndex), [itemIndex])}
                intent="danger"
              />
            ]}
            hotKeys={{}}
          />
        </Summary>
        <Collapse isOpen={isOpen}>
          <Column padding>
            <ItemEditor
              item={item}
              onChange={useCallback(
                <P extends keyof ContentItem>(key: P, value: ContentItem[P]) =>
                  updateItem(bufferId, itemIndex, key, value),
                [itemIndex]
              )}
            />
          </Column>
        </Collapse>
      </Details>
    );
  }
);
