import * as React from "react";
import { useContext } from "react";
import { connector } from "../../reducers";
import { UserConfigEditor } from "../editor/UserConfigEditor";
import { UserContext } from "../project/Context";
import { Page } from "./Page";

const ConfigPage = connector(
  () => ({}),
  () => ({}),
  () => {
    const currentUser = useContext(UserContext);

    return (
      <Page>
        <UserConfigEditor bufferId={currentUser.configId} />
      </Page>
    );
  }
);

export default ConfigPage;
