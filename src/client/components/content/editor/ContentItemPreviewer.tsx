import * as React from "react";
import { useMemo } from "react";
import { ContentRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { ContentItem } from "../../../../shared/content";
import { createContentRevision } from "../../../domain/content";
import { ContentPreviewer } from "./ContentPreviewer";

export const ContentItemPreviewer = React.memo<{
  item: ContentItem;
  isOpen: boolean;
  onClose: () => void;
}>(({ item, isOpen, onClose }) => {
  const content = useMemo<SaveParams<ContentRevision>>(
    () => ({
      ...createContentRevision(""),
      items: [item]
    }),
    [item]
  );

  return <ContentPreviewer content={content} isOpen={isOpen} onClose={onClose} />;
});
