import { UUID } from "./BaseEntityObject";
import { BaseReportObject } from "./BaseReportObject";

export interface PlaylistReport extends BaseReportObject {
  playlistSummaryId?: UUID;
}
