import { strict as assert } from "assert";
import { AppDiaryEntry } from "../../../../shared/api/entities";
import { close, connect, createMocks, getSearchResult, reset, setSearchParams } from "../../../__tests__/helpers";
import { AppDiaryEntryEntity } from "../../../database/entities";
import { GET } from "../app-diary-entries";

describe("api > app-diary-entries", () => {
  beforeAll(async () => connect());
  beforeEach(async () => reset());
  afterAll(async () => close());

  describe("GET", () => {
    test("200", async () => {
      const { req, res, next, manager } = await createMocks("Guest");

      const appDiaryEntry = new AppDiaryEntryEntity(new Date());
      await manager.save(appDiaryEntry);

      setSearchParams<AppDiaryEntry>(req, {});

      await GET(req, res, next);
      assert.equal(res.statusCode, 200);

      const response = getSearchResult(res);
      assert.equal(response.count, 1);
    });
  });
});
