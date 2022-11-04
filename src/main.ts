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
  configSchema: {},
  rulesetConstructor: () => {
    return new Ruleset({
      name,
      rules: [MustHaveOperationDescription],
    });
  },
};
