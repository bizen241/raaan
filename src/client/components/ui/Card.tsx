import { Avatar, Card as MuiCard, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import { Column } from "./Column";

export const Card = React.memo<{
  icon: React.ReactNode;
  title: React.ReactNode;
  padding?: boolean;
  children: React.ReactNode;
}>(({ icon, title, padding = true, children }) => {
  const cardClasses = useCardStyles();

  return (
    <Column pb={1}>
      <MuiCard>
        <CardHeader
          avatar={<Avatar className={cardClasses.avatar}>{icon}</Avatar>}
          title={<Typography>{title}</Typography>}
        />
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

const useCardStyles = makeStyles(theme => ({
  avatar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper
  }
}));
