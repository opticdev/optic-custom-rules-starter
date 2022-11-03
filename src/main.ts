import { Matchers, Ruleset, OperationRule } from "@useoptic/rulesets-base";

export const MustHaveOperationDescription = new OperationRule({
  name: "Must have description version",
  rule: (operationAssertions) => {
    operationAssertions.requirement.matches({
      description: Matchers.string,
    });
  },
});

const name = "name-of-custom-rules-package";
export default {
  name,
  description: "An example ruleset that validates things in OpenAPI",
  // A JSON schema object
  configSchema: {
    type: "object",
    properties: {
      exclude_operations_with_extension: {
        type: "string",
      },
    },
  },
  rulesetConstructor: (options: {
    exclude_operations_with_extension?: string;
  }) => {
    return new Ruleset({
      name,
      matches: (context) => {
        if (options.exclude_operations_with_extension) {
          return (
            context.operation.raw[options.exclude_operations_with_extension] !==
            true
          );
        } else {
          return true;
        }
      },
      rules: [MustHaveOperationDescription],
    });
  },
};
