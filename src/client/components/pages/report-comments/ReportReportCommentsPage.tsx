import { Comment } from "@material-ui/icons";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ReportCommentEditor } from "../../editors/ReportCommentEditor";
import { ReportCommentList } from "../../lists/report-comments/ReportCommentList";
import { UserContext } from "../../project/Context";
import { Loading } from "../../project/Loading";
import { Button } from "../../ui";

export const ReportReportCommentsPage = createPage()(
  React.memo(({ t }) => t("報告へのコメント")),
  React.memo(props => {
    const reportId = props.match.params.id;

    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const reportCommentBuffers = useBuffers("ReportComment");
    const reportCommentId = Object.keys(reportCommentBuffers).find(bufferId => {
      const buffer = reportCommentBuffers[bufferId];

      return buffer !== undefined && buffer.targetId === reportId;
    });

    const onComment = () => {
      dispatch(
        actions.buffers.update("ReportComment", generateBufferId(), {
          targetId: reportId
        })
      );
    };

    const { entity: report, ...reportProps } = useEntity("Report", reportId);
    if (report === undefined) {
      return <Loading {...reportProps} />;
    }

    const isOwner = currentUser.permission === "Owner";
    const isOwn = report.reporterId === currentUser.id;

    if (!isOwner && !isOwn) {
      return null;
    }

    return (
      <>
        {reportCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {reportCommentId !== undefined && <ReportCommentEditor bufferId={reportCommentId} />}
        <ReportCommentList
          initialParams={{
            targetId: reportId
          }}
        />
      </>
    );
  })
);
