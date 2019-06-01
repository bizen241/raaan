import { Box, Button, Card, CardActions, CardContent, CardHeader } from "@material-ui/core";
import * as React from "react";

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
      return (
        <Box p={1}>
          <Card>
            <CardHeader title="エラーが発生しました" subheader={error.message} />
            <CardContent>{error.stack}</CardContent>
            <CardActions>
              <Button
                color="primary"
                onClick={() => {
                  location.reload();
                }}
              >
                リロード
              </Button>
              <Button
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
              >
                すべて削除してリロード
              </Button>
            </CardActions>
          </Card>
        </Box>
      );
    } else {
      return this.props.children;
    }
  }
}
