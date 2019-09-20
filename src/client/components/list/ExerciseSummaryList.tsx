import {
  Box,
  Collapse,
  IconButton,
  InputAdornment,
  Link,
  NativeSelect,
  OutlinedInput,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@material-ui/core";
import { Edit, Refresh, Search, Tune } from "@material-ui/icons";
import * as React from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ExerciseSummary } from "../../../shared/api/entities";
import { SearchParams } from "../../../shared/api/request/search";
import { createEntityList } from "../../enhancers/createEntityList";
import { useToggleState } from "../../hooks/toggle";
import { UserContext } from "../project/Context";

export const ExerciseSummaryList = createEntityList<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: exerciseSummary }) => {
    const currentUser = useContext(UserContext);

    return (
      <TableRow>
        <TableCell>
          <Box display="flex" flexDirection="column">
            <Link color="textPrimary" component={RouterLink} to={`/exercises/${exerciseSummary.exerciseId}`}>
              <Typography>{exerciseSummary.title || "無題"}</Typography>
            </Link>
          </Box>
        </TableCell>
        {exerciseSummary.authorId === currentUser.id ? (
          <TableCell padding="checkbox">
            <IconButton component={RouterLink} to={`/exercise-drafts/${exerciseSummary.draftId}/edit`}>
              <Edit />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    );
  }),
  React.memo(({ params, onReload, onChange }) => {
    const [searchText, setSearchText] = useState("");
    const [searchTarget, setSearchTarget] = useState<keyof SearchParams<ExerciseSummary>>(
      params.tags !== undefined ? "tags" : "title"
    );

    const [isSearchConditionOpen, onToggleSearchCondition] = useToggleState();

    useEffect(() => {
      const currentSearchText = params[searchTarget];

      if (typeof currentSearchText === "string") {
        setSearchText(currentSearchText);
      }
    }, [params]);

    return (
      <>
        <Box display="flex" pb={1}>
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
          <Box flex={1} />
          <IconButton onClick={onToggleSearchCondition}>
            <Tune />
          </IconButton>
        </Box>
        <Collapse in={isSearchConditionOpen} timeout="auto" unmountOnExit>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" pb={1}>
              <Box display="flex" flexDirection="column" component="label">
                <Typography color="textSecondary">検索対象</Typography>
                <NativeSelect
                  input={<OutlinedInput labelWidth={0} />}
                  value={searchTarget}
                  onChange={e => {
                    const next = e.target.value as keyof SearchParams<ExerciseSummary>;

                    setSearchTarget(prev => {
                      onChange({
                        [prev]: undefined,
                        [next]: params[prev]
                      });

                      return next;
                    });
                  }}
                >
                  <option key="title" value="title">
                    題名
                  </option>
                  <option key="tags" value="tags">
                    タグ
                  </option>
                </NativeSelect>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" pb={1}>
              <Box display="flex" flexDirection="column" component="label">
                <Typography color="textSecondary">並び順</Typography>
                <NativeSelect input={<OutlinedInput labelWidth={0} />} defaultValue="title">
                  <option key="title" value="title">
                    更新が新しい順
                  </option>
                  <option key="tags" value="tags">
                    更新が古い順
                  </option>
                </NativeSelect>
              </Box>
            </Box>
          </Box>
        </Collapse>
        <Box display="flex" flexDirection="column" pb={1}>
          <Box display="flex" flexDirection="column" component="label">
            <Typography color="textSecondary">キーワード</Typography>
            <TextField
              variant="outlined"
              value={searchText}
              onChange={useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value), [])}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() =>
                        onChange({
                          [searchTarget]: searchText
                        })
                      }
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>
      </>
    );
  })
);
