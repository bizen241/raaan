import { Box, Collapse, IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Edit, Refresh, Tune } from "@material-ui/icons";
import * as React from "react";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PlaylistSummary } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useToggleState } from "../../../hooks/useToggleState";
import { UserContext } from "../../project/Context";
import { Column, Row, Search, Select } from "../../ui";

export const PlaylistSummaryList = createEntityList("PlaylistSummary")(
  React.memo(({ entity: playlistSummary }) => {
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link color="textPrimary" component={RouterLink} to={`/playlists/${playlistSummary.playlistId}`}>
              <Typography>{playlistSummary.title || "無題"}</Typography>
            </Link>
          </Column>
        </TableCell>
        {playlistSummary.authorId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton component={RouterLink} to={`/playlists/${playlistSummary.playlistId}/edit`}>
              <Edit />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    );
  }),
  React.memo(({ params, onReload, onChange }) => {
    const [isSearchConditionOpen, onToggleSearchCondition] = useToggleState();
    const [searchText, setSearchText] = useState("");

    const searchTarget = getSearchTarget(params);

    return (
      <>
        <Row pb={1}>
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
          <Box flex={1} />
          <IconButton onClick={onToggleSearchCondition}>
            <Tune />
          </IconButton>
        </Row>
        <Collapse in={isSearchConditionOpen} timeout="auto" unmountOnExit>
          <Column>
            <Select<Required<PlaylistSummary>["searchSort"]>
              label="並び順"
              options={{
                createdAt: {
                  label: "作成日時"
                }
              }}
              defaultValue="createdAt"
              onChange={value => onChange({ searchSort: value })}
            />
            <Select<SearchTarget>
              label="検索対象"
              options={{
                title: {
                  label: "タイトル"
                },
                tags: {
                  label: "タグ"
                }
              }}
              defaultValue={searchTarget}
              onChange={value =>
                onChange({
                  [searchTarget]: undefined,
                  [value]: searchText
                })
              }
            />
          </Column>
        </Collapse>
        <Column pb={1}>
          <Search
            label="キーワード"
            defaultValue={searchText}
            onChange={e => setSearchText(e.target.value)}
            onSearch={() => onChange({ [searchTarget]: searchText })}
          />
        </Column>
      </>
    );
  })
);

type SearchTarget = "title" | "tags";

const getSearchTarget = (params: Params<PlaylistSummary>): SearchTarget =>
  params.title !== undefined ? "title" : "tags";
