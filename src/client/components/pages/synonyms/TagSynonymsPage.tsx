import { Add } from "@material-ui/icons";
import React, { useContext } from "react";
import { useToggleState } from "../../../hooks/useToggleState";
import { UploadSynonymDialog } from "../../dialogs/synonyms/UploadSynonymDialog";
import { SynonymList } from "../../lists/synonyms/SynonymList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const TagSynonymsPage = React.memo<PageProps>(props => {
  const tagName = props.match.params.name;

  const currentUser = useContext(UserContext);

  const [isUploadSynonymDialogOpen, onToggleUploadSynonymDialog] = useToggleState();

  const isOwner = currentUser.permission === "Owner";

  return (
    <Page title="タグの別名">
      {isOwner && <Button icon={<Add />} label="新しい別名を作る" onClick={onToggleUploadSynonymDialog} />}
      <SynonymList
        initialParams={{
          target: tagName
        }}
      />
      <UploadSynonymDialog target={tagName} isOpen={isUploadSynonymDialogOpen} onClose={onToggleUploadSynonymDialog} />
    </Page>
  );
});
