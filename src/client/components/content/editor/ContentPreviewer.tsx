import { Button, Classes, Dialog } from "@blueprintjs/core";
import * as React from "react";
import { ContentRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { Column } from "../../ui";
import { ContentPlayer } from "../player/ContentPlayer";

export const ContentPreviewer = React.memo<{
  content: SaveParams<ContentRevision>;
  isOpen: boolean;
  onClose: () => void;
}>(({ content, isOpen, onClose }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      style={{
        width: "95vw",
        height: "95vh",
        maxWidth: "1000px",
        margin: 0,
        padding: 0
      }}
      className="bp3-dark"
    >
      <Column className={Classes.DIALOG_BODY} padding flex={1}>
        <Column flex={1}>
          <ContentPlayer content={content} />
        </Column>
        <Button onClick={onClose}>閉じる (Esc)</Button>
      </Column>
    </Dialog>
  );
});
