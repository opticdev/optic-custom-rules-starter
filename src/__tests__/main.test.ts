import { expect, test } from "@jest/globals";
import { MustHaveApiVersion } from "../main";
import { TestHelpers } from "@useoptic/rulesets-base";

test("MustHaveApiVersion", () => {
  const beforeApiSpec = {
    ...TestHelpers.createEmptySpec(),
  };
  const afterApiSpec = {
    ...TestHelpers.createEmptySpec(),
  };
  const ruleResults = TestHelpers.runRulesWithInputs(
    [MustHaveApiVersion],
    beforeApiSpec,
    afterApiSpec
  );

  expect(ruleResults.length > 0).toBe(true);
  expect(ruleResults.every((result) => result.passed)).toBe(true);
});
