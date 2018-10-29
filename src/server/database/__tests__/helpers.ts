import { Connection } from "typeorm";
import { connectDatabase } from "..";
import { testProcessEnv } from "../../__tests__/helpers";
import { setGuestUser } from "../setup/guest";

export class TestDatabase {
  connection?: Connection;

  async connect() {
    this.connection = await connectDatabase(testProcessEnv);

    await this.connection.synchronize(true);

    await setGuestUser();
  }

  async reset() {
    if (this.connection !== undefined) {
      await this.connection.synchronize(true);

      await setGuestUser();
    }
  }

  async close() {
    if (this.connection !== undefined) {
      await this.connection.close();
    }
  }
}
