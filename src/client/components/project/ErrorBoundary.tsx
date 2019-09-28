import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons";
import * as React from "react";
import { Button, Column } from "../ui";
import { useStyles } from "../ui/styles";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  static getDerivedStateFromError(e: Error): ErrorBoundaryState {
    console.error(e);

    return {
      hasError: true,
      error: e
    };
  }

  constructor(props: React.Props<{}>) {
    super(props);

    this.state = { hasError: false };
  }

  render() {
    const { hasError, error = new Error() } = this.state;
    if (hasError) {
      return <ErrorViewer error={error} />;
    }

    return this.props.children;
  }
}

const ErrorViewer: React.FunctionComponent<{ error: Error }> = ({ error }) => {
  const classes = useStyles();

  return (
    <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
      <Column width="100%" maxWidth="1000px">
        <Column p={1}>
          <Column pb={1}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar className={classes.cardAvatar}>
                    <ErrorIcon />
                  </Avatar>
                }
                title={<Typography>エラーが発生しました</Typography>}
                subheader={error.message}
              />
              <CardContent>{error.stack}</CardContent>
            </Card>
          </Column>
          <Column pb={1}>
            <Button
              label="リロード"
              onClick={() => {
                location.reload();
              }}
            />
          </Column>
          <Button
            label="すべて削除してリロード"
            labelColor="error"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          />
        </Column>
      </Column>
    </Column>
  );
};
