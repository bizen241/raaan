import { Comment } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
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
    const reportId = props.match.params.id as EntityId<"Report">;

    const dispatch = useDispatch();

    const { bufferIds: reportCommentBufferIds, bufferMap: reportCommentBufferMap } = useBuffers("ReportComment");
    const reportCommentId = reportCommentBufferIds.find(bufferId => {
      const buffer = reportCommentBufferMap[bufferId];

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
        {!reportCommentId && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
        {reportCommentId && <ReportCommentEditor bufferId={reportCommentId} />}
        <ReportCommentList
          initialParams={{
            targetId: reportId
          }}
        />
      </>
    );
  })
);
