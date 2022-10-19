import { Matchers, SpecificationRule } from "@useoptic/rulesets-base";

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
  rules: [MustHaveApiVersion],
};
