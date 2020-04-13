import { Refresh } from "@material-ui/icons";
import React from "react";
import { Column, IconButton } from "../ui";

type PlaylistItemsErrorBoundaryProps = {
  onReload: () => void;
};

type PlaylistItemsErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export class PlaylistItemsErrorBoundary extends React.Component<
  PlaylistItemsErrorBoundaryProps,
  PlaylistItemsErrorBoundaryState
> {
  static getDerivedStateFromError(e: Error): PlaylistItemsErrorBoundaryState {
    return {
      hasError: true,
      error: e,
    };
  }

  constructor(props: PlaylistItemsErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <Column>
          <IconButton icon={Refresh} onClick={this.props.onReload} />
        </Column>
      );
    }

    return this.props.children;
  }
}
