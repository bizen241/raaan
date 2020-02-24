import { Add } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useToggleState } from "../../../hooks/useToggleState";
import { UploadSynonymDialog } from "../../dialogs/synonyms/UploadSynonymDialog";
import { SynonymList } from "../../lists/synonyms/SynonymList";
import { Button } from "../../ui";

export const TagSynonymsPage = createPage()(
  React.memo(({ t }) => t("タグの別名")),
  React.memo(({ name: tagName }) => {
    const { currentUser } = useCurrentUser();

    const [isUploadSynonymDialogOpen, onToggleUploadSynonymDialog] = useToggleState();

    const isOwner = currentUser.permission === "Owner";

    return (
      <>
        {isOwner && <Button icon={<Add />} label="新しい別名を作る" onClick={onToggleUploadSynonymDialog} />}
        <SynonymList
          initialParams={{
            target: tagName
          }}
        />
        <UploadSynonymDialog
          target={tagName}
          isOpen={isUploadSynonymDialogOpen}
          onClose={onToggleUploadSynonymDialog}
        />
      </>
    );
  })
);
