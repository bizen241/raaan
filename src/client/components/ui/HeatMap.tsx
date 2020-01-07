import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";
import { Row } from "./Row";

export const getToday = () =>
  new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime() - (51 * 7 + new Date().getDay()) * 24 * 60 * 60 * 1000;

export type HeatMapContents = { [date: string]: number | undefined };

export const HeatMap = React.memo<{
  firstDate: number;
  contents: HeatMapContents;
  onClick: (date: string) => void;
}>(({ firstDate, contents, onClick }) => {
  const heatMapClasses = useHeatMapStyles();

  const onClickRect = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const date = e.currentTarget.dataset.date;
    if (date === undefined) {
      return;
    }

    onClick(date);
  }, []);

  return (
    <Row justifyContent="center" pb={1}>
      <Row style={{ overflowX: "auto", cursor: "pointer" }} dir="rtl">
        <Row dir="ltr" padding="2px">
          <svg width={937} height={127}>
            {year.map((_, weekIndex) => (
              <g key={weekIndex} transform={`translate(${weekIndex * 18 + 1}, 1)`}>
                {week.map((__, dateIndex) => {
                  const date = firstDate + ((weekIndex + 1) * 7 + dateIndex - 7) * 24 * 60 * 60 * 1000;
                  const count = contents[date];

                  return (
                    <rect
                      key={dateIndex}
                      className={count !== undefined ? heatMapClasses.heatMapBusyItem : heatMapClasses.heatMapBlankItem}
                      width={17}
                      height={17}
                      data-date={date}
                      x={0}
                      y={dateIndex * 18}
                      onClick={onClickRect}
                    />
                  );
                })}
              </g>
            ))}
          </svg>
        </Row>
      </Row>
    </Row>
  );
});

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
