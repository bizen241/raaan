import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../../../enhancers/createPage";
import { useBuffers } from "../../../hooks/useBuffers";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ReportCommentEditor } from "../../editors/ReportCommentEditor";
import { ReportCommentList } from "../../lists/report-comments/ReportCommentList";
import { Button } from "../../ui";

export const ReportReportCommentsPage = createPage()(
  React.memo(({ t }) => t("報告へのコメント")),
  React.memo(props => {
    const reportId = props.match.params.id;

    const dispatch = useDispatch();

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
