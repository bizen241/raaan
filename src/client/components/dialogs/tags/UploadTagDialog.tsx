import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadTagDialog = createDialog<{
  tagId: EntityId<"Tag">;
}>()(
  React.memo(({ t }) => t("タグをアップロード")),
  React.memo(({ tagId }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Tag", tagId, undefined, uploadResponse => {
          const tag = Object.values(uploadResponse.Tag)[0];

          if (tag !== undefined) {
            dispatch(replace(`/tags/${tag.name}`));
          } else {
            dispatch(replace(`/tags`));
          }
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>タグをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
