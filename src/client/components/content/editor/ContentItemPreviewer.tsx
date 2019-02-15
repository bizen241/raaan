import * as React from "react";
import { useMemo } from "react";
import { ContentItem } from "../../../../shared/content";
import { ContentRevisionParams, createContentRevision } from "../../../domain/content";
import { ContentPreviewer } from "./ContentPreviewer";

export const ContentItemPreviewer = React.memo<{
  item: ContentItem;
  isOpen: boolean;
  onClose: () => void;
}>(({ item, isOpen, onClose }) => {
  const content = useMemo<ContentRevisionParams>(
    () => ({
      ...createContentRevision(""),
      items: [item]
    }),
    [item]
  );

  return <ContentPreviewer content={content} isOpen={isOpen} onClose={onClose} />;
});
