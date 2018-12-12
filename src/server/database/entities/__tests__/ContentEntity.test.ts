import { getManager } from "typeorm";
import { TestDatabase } from "../../__tests__/helpers";
import { ContentEntity } from "../ContentEntity";
import { insertContent } from "./helpers";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("ContentEntity", async () => {
  await insertContent();

  const contents = await getManager().find(ContentEntity);

  expect(contents.length).toBe(1);
});
