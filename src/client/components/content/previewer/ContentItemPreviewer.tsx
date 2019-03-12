import * as React from "react";
import { useMemo } from "react";
import { ContentRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { ContentItem } from "../../../../shared/content";
import { createContentRevision } from "../../../domain/content";
import { connector } from "../../../reducers";
import { dialogActions } from "../../../reducers/dialog";
import { ContentPreviewDialog } from "./ContentPreviewDialog";

export const ContentItemPreviewer = connector(
  (state, ownProps: { item: ContentItem }) => ({
    ...ownProps,
    isOpen: state.dialog.name === "ContentItemPreviewer"
  }),
  () => ({
    onClose: dialogActions.close
  }),
  ({ item, isOpen, onClose }) => {
    const params = useMemo<SaveParams<ContentRevision>>(
      () => ({
        ...createContentRevision(""),
        items: [item]
      }),
      [item]
    );

    return <ContentPreviewDialog params={params} isOpen={isOpen} onClose={onClose} />;
  }
);
