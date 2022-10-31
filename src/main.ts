import { Matchers, Ruleset, SpecificationRule } from "@useoptic/rulesets-base";

export const MustHaveApiVersion = new SpecificationRule({
  name: "Must have api version",
  rule: (specificationAssertions) => {
    specificationAssertions.requirement.matches({
      info: {
        version: Matchers.string,
      },
    });
  },
});

export default {
  name: "example-ruleset",
  description: "An example ruleset that validates things in OpenAPI",
  // A JSON schema object
  configSchema: {
    type: "object",
    properties: {
      required_on: {
        type: "string",
        enum: ["always", "added"],
      },
    },
  },
  rulesetConstructor: (options: { required_on: "always" | "added" }) => {
    return new Ruleset({
      name: "example-ruleset",
      rules: [MustHaveApiVersion],
    });
  },
};
