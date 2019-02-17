import { Button } from "@blueprintjs/core";
import * as React from "react";
import { Column } from "../ui";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  static getDerivedStateFromError(e: Error): ErrorBoundaryState {
    console.log(e);

    return {
      hasError: true
    };
  }

  constructor(props: React.Props<{}>) {
    super(props);

    this.state = { hasError: false };
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Column padding="medium">
          <Column padding="small">
            <Button
              onClick={() => {
                location.reload();
              }}
            >
              リロード
            </Button>
          </Column>
          <Column padding="small">
            <Button
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
            >
              すべて削除してリロード
            </Button>
          </Column>
        </Column>
      );
    } else {
      return this.props.children;
    }
  }
}
