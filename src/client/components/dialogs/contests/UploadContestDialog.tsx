import { Typography } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadContestDialog = createDialog<{
  contestId: EntityId<"Contest">;
}>()(
  React.memo(({ t }) => t("セッションのアップロード")),
  React.memo(({ contestId: bufferId }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Contest", bufferId, undefined, uploadResponse => {
          const contestId = Object.keys(uploadResponse.Contest)[0];

          dispatch(replace(`/contests/${contestId}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>セッションをアップロードします。</Typography>
        </Card>
        <Button icon={<CloudUpload />} label="アップロード" onClick={onUpload} />
      </>
    );
  })
);
