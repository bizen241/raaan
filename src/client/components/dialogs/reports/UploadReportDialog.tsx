import { Typography } from "@material-ui/core";
import { ReportProblem } from "@material-ui/icons";
import { replace } from "connected-react-router";
import React from "react";
import { useDispatch } from "react-redux";
import { endpoints } from "../../../../shared/api/endpoint";
import { ReportTargetType } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { Button, Card } from "../../ui";

export const UploadReportDialog = createDialog<{
  reportId: string;
  targetType: ReportTargetType;
  targetId: string;
}>()(
  React.memo(({ t }) => t("報告をアップロードする")),
  React.memo(({ reportId, targetId, targetType }) => {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser();

    const onUpload = () => {
      dispatch(
        actions.api.upload("Report", reportId, undefined, uploadResponse => {
          dispatch(
            actions.cache.add(
              "Report",
              {
                reporterId: currentUser.id,
                targetType,
                targetId
              },
              uploadResponse
            )
          );

          const path = endpoints[targetType];

          dispatch(replace(`/${path}/${targetId}`));
        })
      );
    };

    return (
      <>
        <Card>
          <Typography>報告をアップロードします。</Typography>
        </Card>
        <Button icon={<ReportProblem />} label="報告をアップロード" onClick={onUpload} />
      </>
    );
  })
);
