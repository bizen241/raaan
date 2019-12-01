import { Card as MuiCard, CardContent, Typography } from "@material-ui/core";
import * as React from "react";
import { Column } from "./Column";
import { Row } from "./Row";

export const Card = React.memo<{
  icon?: React.ReactNode;
  title?: React.ReactNode;
  action?: React.ReactNode;
  padding?: boolean;
  children: React.ReactNode;
}>(({ icon, title, action, padding = true, children }) => {
  return (
    <Column pb={1}>
      <MuiCard>
        {(icon !== undefined || title !== undefined) && (
          <Row alignItems="center" pr={2}>
            <Row alignItems="center" py={2} pl={2} flex={1}>
              {icon}
              <Row flex={1} px={2}>
                <Typography>{title}</Typography>
              </Row>
            </Row>
            {action}
          </Row>
        )}
        {padding ? (
          <CardContent>
            <Column>{children}</Column>
          </CardContent>
        ) : (
          children
        )}
      </MuiCard>
    </Column>
  );
});
