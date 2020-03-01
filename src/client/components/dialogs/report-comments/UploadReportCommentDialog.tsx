import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadReportCommentDialog = createDialog<{
  bufferId: EntityId<"ReportComment">;
  targetId: EntityId<"Report">;
}>()(
  React.memo(({ t }) => t("報告へのコメントをアップロード")),
  React.memo(({ bufferId, targetId, onClose }) => {
    const dispatch = useDispatch();

    const onUpload = () => {
      dispatch(
        actions.api.upload("ReportComment", bufferId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "ReportComment",
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
          <Typography>報告へのコメントをアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="報告へのコメントをアップロード" onClick={onUpload} />
      </>
    );
  })
);
