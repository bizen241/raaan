import { Button, Classes } from "@blueprintjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { ContentItem } from "../../../../shared/content";
import { Column } from "../../ui";
import { manageHotKey } from "../../utils/hotKey";
import { ContentItemEditor } from "./ContentItemEditor";
import { ContentItemTypeSelector } from "./ContentItemTypeSelector";

export const ContentItemsEditor = React.memo<{
  items: ContentItem[];
  isVisible: boolean;
  selectedItemType: ContentItem["type"];
  onSelectItemType: (type: ContentItem["type"]) => void;
  onChange: <P extends keyof ContentItem>(index: number, key: P, value: ContentItem[P]) => void;
  onDelete: (index: number) => void;
  onAppend: () => void;
}>(({ items, isVisible, selectedItemType, onSelectItemType, onChange, onDelete, onAppend }) => {
  const itemTypeSelectRef = useRef<HTMLSelectElement>(null);

  const focusedItemRef = useRef<HTMLButtonElement>(null);
  const [focusedItemIndex, setFocusedItemIndex] = useState(0);
  const focusItem = useCallback((index: number) => setFocusedItemIndex(index), []);

  useEffect(
    manageHotKey(
      {
        a: onAppend,
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
            editorRef={index === focusedItemIndex ? focusedItemRef : null}
            hotKey={undefined}
            onChange={onChange}
            onDelete={onDelete}
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
        <Button autoFocus onClick={onAppend} className={Classes.INTENT_PRIMARY}>
          追加 (A)
        </Button>
      </Column>
    </Column>
  );
});
