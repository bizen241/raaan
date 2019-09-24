import { Avatar, Box, Card, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/icons";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { UserDiary } from "../../../shared/api/entities";
import { useSearch } from "../../hooks/search";
import { UserContext } from "../project/Context";
import { useStyles } from "../ui/styles";

type DateToUserDiary = { [date: string]: UserDiary | undefined };

export const UserDiaryGraph = () => {
  const classes = useStyles();
  const heatMapClasses = useHeatMapStyles();
  const currentUser = useContext(UserContext);

  const [userDiaries, setUserDiaries] = useState<DateToUserDiary>({});

  const { entities, count, params, status, onChange } = useSearch<UserDiary>("UserDiary", {
    userId: currentUser.id,
    limit: 100,
    offset: 0
  });

  const firstDate =
    new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime() - (51 * 7 + new Date().getDay()) * 24 * 60 * 60 * 1000;

  useEffect(() => {
    if (status !== 200) {
      return;
    }

    const searchedUserDiaries: DateToUserDiary = {};
    entities.forEach(entity => {
      if (entity !== undefined) {
        const date = new Date(entity.date).getTime();

        searchedUserDiaries[date] = entity;
      }
    });

    setUserDiaries({ ...userDiaries, ...searchedUserDiaries });

    const lastEntity = entities[entities.length - 1];
    if (Object.keys(userDiaries).length < count && lastEntity && new Date(lastEntity.date).getTime() > firstDate) {
      onChange({
        offset: (params.offset || 0) + 100
      });
    }
  }, [entities]);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className={classes.cardAvatar}>
            <Timeline />
          </Avatar>
        }
        title={<Typography>活動記録</Typography>}
      />
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Box display="flex" style={{ overflowX: "auto" }} dir="rtl">
            <Box display="flex" dir="ltr" padding="2px">
              <svg width={937} height={127}>
                {year.map((_, weekIndex) => (
                  <g key={weekIndex} transform={`translate(${weekIndex * 18 + 1}, 1)`}>
                    {week.map((__, dateIndex) => {
                      const date = firstDate + ((weekIndex + 1) * 7 + dateIndex - 7) * 24 * 60 * 60 * 1000;
                      const diary = userDiaries[date];

                      return (
                        <rect
                          key={dateIndex}
                          className={
                            diary !== undefined ? heatMapClasses.heatMapBusyItem : heatMapClasses.heatMapBlankItem
                          }
                          width={17}
                          height={17}
                          x={0}
                          y={dateIndex * 18}
                        />
                      );
                    })}
                  </g>
                ))}
              </svg>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const year = [...new Array(52).keys()];
const week = [...new Array(7).keys()];

const useHeatMapStyles = makeStyles(theme => ({
  heatMapBlankItem: {
    fill: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800]
  },
  heatMapBusyItem: {
    fill: theme.palette.primary.main
  }
}));
