import { Delete, Error as ErrorIcon, Refresh } from "@material-ui/icons";
import * as React from "react";
import { Button, Card, Column } from "../ui";

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
  return (
    <Column alignItems="center" width="100%" position="absolute" top={0} left={0}>
      <Column width="100%" maxWidth="1000px">
        <Column p={1}>
          <Card icon={<ErrorIcon />} title="エラーが発生しました">
            {error.stack}
          </Card>
          <Button
            icon={<Refresh />}
            label="リロード"
            color="default"
            onClick={() => {
              location.reload();
            }}
          />
          <Button
            icon={<Delete />}
            label="すべて削除してリロード"
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
