import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { TestDatabase } from "../../__tests__/helpers";
import { createContentBranch } from "../ContentBranchEntity";
import { ContentEntity, createContent } from "../ContentEntity";
import { createContentRevision } from "../ContentRevisionEntity";

const testDatabase = new TestDatabase();

beforeAll(async () => {
  await testDatabase.connect();
});
afterAll(async () => {
  await testDatabase.close();
});

test("ContentEntity", async () => {
  const manager = getManager();

  await manager.save(users.Read);

  const content = createContent({
    id: uuid()
  });
  const branch = createContentBranch({
    id: uuid(),
    content,
    lang: "ja"
  });
  const revision = createContentRevision({
    id: uuid(),
    branch,
    author: users.Read,
    version: 1,
    comment: "",
    object: {},
    isDraft: true
  });

  await manager.save(content);
  await manager.save(branch);
  await manager.save(revision);

  content.source = branch;
  branch.latest = revision;

  await manager.save(content);
  await manager.save(branch);

  const contents = await manager.find(ContentEntity);

  expect(contents.length).toBe(1);
});
