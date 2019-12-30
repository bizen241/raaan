import { Comment } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useBuffers } from "../../../hooks/useBuffers";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { ReportCommentEditor } from "../../editor/ReportComentEditor";
import { ReportCommentList } from "../../list/report-comments/ReportCommentList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button, Page } from "../../ui";

export const ReportReportCommentsPage = React.memo<PageProps>(props => {
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

  const { entity: report } = useEntity("Report", reportId);
  if (report === undefined) {
    return null;
  }

  const isOwner = currentUser.permission === "Owner";
  const isOwn = report.reporterId === currentUser.id;

  if (!isOwner && !isOwn) {
    return null;
  }

  return (
    <Page title="報告へのコメント">
      {reportCommentId === undefined && <Button icon={<Comment />} label="コメントする" onClick={onComment} />}
      {reportCommentId !== undefined && <ReportCommentEditor bufferId={reportCommentId} />}
      <ReportCommentList
        initialParams={{
          targetId: reportId
        }}
      />
    </Page>
  );
});
