import { Trans } from "@lingui/react";
import * as React from "react";
import { Link } from "react-router-dom";
import { connector } from "../../reducers";

export const Home = connector(
  () => ({}),
  () => ({}),
  ({}) => {
    return (
      <div>
        <main>
          <h1>Typing</h1>
          <div>
            <a href="/auth/github">
              <Trans>ログイン</Trans>
            </a>
            /
            <a href="/logout">
              <Trans>ログアウト</Trans>
            </a>
          </div>
          <div>
            <Link to="/revisions/new">新規作成</Link>
          </div>
        </main>
      </div>
    );
  }
);
