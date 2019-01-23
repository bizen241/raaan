import { Button } from "@blueprintjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { ContentItem } from "../../../../shared/content";
import { contentItemCreators } from "../../../domain/content";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemEditor } from "./ContentItemEditor";
import { ContentItemTypeSelector } from "./ContentItemTypeSelector";

export const ContentItemsEditor = React.memo<{
  items: ContentItem[];
  isVisible: boolean;
  selectedItemType: ContentItem["type"];
  onSelectItemType: (type: ContentItem["type"]) => void;
  onChange: (items: ContentItem[]) => void;
}>(({ isVisible, selectedItemType, onChange, onSelectItemType, ...props }) => {
  const focusedItemRef = useRef<HTMLButtonElement>(null);
  const itemTypeSelectRef = useRef<HTMLSelectElement>(null);

  const [focusedItemIndex, setFocusedItemIndex] = useState(0);

  const focusItem = useCallback((index: number) => setFocusedItemIndex(index), []);

  const [items, setItems] = useState(props.items);

  const updateItem = useCallback(
    (updatedItem: ContentItem) =>
      setItems(s => {
        const { id } = updatedItem;
        const index = s.findIndex(item => item.id === id);
        return [...s.slice(0, index), updatedItem, ...s.slice(index + 1)];
      }),
    []
  );
  const deleteItem = useCallback((id: string) => {
    setItems(s => {
      const index = s.findIndex(item => item.id === id);
      return [...s.slice(0, index), ...s.slice(index + 1)];
    });
  }, []);
  const appendItem = useCallback(
    () => {
      setItems(s => {
        focusItem(s.length);
        return [...s, contentItemCreators[selectedItemType]()];
      });
    },
    [selectedItemType]
  );

  useEffect(() => onChange(items), [items]);
  useEffect(
    manageHotKey(
      {
        a: appendItem,
        Escape: () =>
          focusedItemRef.current != null
            ? focusedItemRef.current.focus()
            : itemTypeSelectRef.current && itemTypeSelectRef.current.focus()
      },
      isVisible
    ),
    [isVisible]
  );

  return (
    <Column>
      <Column padding="small">アイテム</Column>
      {items.map((item, index) => (
        <Column key={item.id} padding="small">
          <ContentItemEditor
            index={index}
            item={item}
            isVisible={isVisible}
            isFocused={index === focusedItemIndex}
            hotKey={undefined}
            editorRef={focusedItemRef}
            onChange={updateItem}
            onDelete={deleteItem}
            onFocus={focusItem}
          />
        </Column>
      ))}
      <Column padding="small">
        <ContentItemTypeSelector
          selected={selectedItemType}
          selectRef={itemTypeSelectRef}
          onChange={onSelectItemType}
        />
      </Column>
      <Column padding="small">
        <Button autoFocus onClick={appendItem}>
          追加 (A)
        </Button>
      </Column>
    </Column>
  );
});
