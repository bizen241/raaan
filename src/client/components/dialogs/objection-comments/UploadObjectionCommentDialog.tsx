import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadObjectionCommentDialog = createDialog<{
  bufferId: string;
  targetId: string;
}>()(
  React.memo(({ t }) => t("抗議へのコメントをアップロード")),
  React.memo(({ bufferId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("ObjectionComment", bufferId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "ObjectionComment",
              {
                targetId
              },
              uploadResponse
            )
          );

          onClose();
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>抗議へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="抗議へのコメントをアップロード" onClick={onUpload} />
      </>
    );
  })
);
