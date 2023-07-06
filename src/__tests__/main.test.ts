import { expect, test } from "@jest/globals";
import { MustHaveOperationDescription } from "../main";
import { TestHelpers } from "@useoptic/rulesets-base";
import { OpenAPIV3 } from "@useoptic/openapi-utilities";

test("MustHaveOperationDescription", async () => {
  const beforeApiSpec: OpenAPIV3.Document = {
    ...TestHelpers.createEmptySpec(),
  };
  const afterApiSpec: OpenAPIV3.Document = {
    ...TestHelpers.createEmptySpec(),
    paths: {
      '/api/users': {
        get: {
          description: "get the list of users",
          responses: {
            '200': {
              description: 'successfully fetched users',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      user_id: {
                        type: 'string'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  const ruleResults = await TestHelpers.runRulesWithInputs(
    [MustHaveOperationDescription],
    beforeApiSpec,
    afterApiSpec
  );

  expect(ruleResults.length > 0).toBe(true);
  expect(ruleResults.every((result) => result.passed)).toBe(true);
});
