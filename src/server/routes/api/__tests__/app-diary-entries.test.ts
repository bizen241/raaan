import { strict as assert } from "assert";
import { AppDiaryEntry } from "../../../../shared/api/entities";
import {
  close,
  connect,
  createMocks,
  createQuery,
  getSearchResult,
  hasSecurity,
  reset
} from "../../../__tests__/helpers";
import { AppDiaryEntryEntity } from "../../../database/entities";
import { GET } from "../app-diary-entries";

describe("app-diary-entries", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("security", () => assert(hasSecurity(GET.apiDoc, "Read")));

    test("200", async () => {
      const { req, res, next, manager } = await createMocks("Read");

      const appDiaryEntry = new AppDiaryEntryEntity(new Date());
      await manager.save(appDiaryEntry);

      req.query = createQuery<AppDiaryEntry>({});

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert(response.entities.AppDiaryEntry[appDiaryEntry.id]);
    });
  });
});
