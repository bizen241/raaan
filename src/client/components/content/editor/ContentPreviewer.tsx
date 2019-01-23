import { Button, Classes, Dialog } from "@blueprintjs/core";
import * as React from "react";
import { ContentData } from "../../../../shared/content";
import { Column } from "../../ui";
import { ContentPlayer } from "../player/ContentPlayer";

export const ContentPreviewer = React.memo<{
  data: ContentData;
  isOpen: boolean;
  onClose: () => void;
}>(({ data, isOpen, onClose }) => {
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
      <Column className={Classes.DIALOG_BODY} padding="small" flex={1}>
        <Column flex={1}>
          <ContentPlayer data={data} />
        </Column>
        <Button onClick={onClose}>閉じる (Esc)</Button>
      </Column>
    </Dialog>
  );
});
