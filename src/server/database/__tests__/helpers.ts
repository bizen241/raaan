import { Connection } from "typeorm";
import { connectDatabase } from "..";
import { testProcessEnv } from "../../__tests__/helpers";

export class TestDatabase {
  connection?: Connection;

  async connect() {
    this.connection = await connectDatabase(testProcessEnv);

    await this.connection.synchronize(true);
  }

  async reset() {
    if (this.connection !== undefined) {
      await this.connection.synchronize(true);
    }
  }

  async close() {
    if (this.connection !== undefined) {
      await this.connection.close();
    }
  }
}
