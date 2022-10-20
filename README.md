# Optic Ruleset

Define your own custom Optic rules by building off of our [ruleset package](https://github.com/opticdev/optic/tree/main/projects/rulesets-base). Learn more by reading our [reference documents](https://github.com/opticdev/optic/blob/main/projects/rulesets-base/docs/Reference.md)

## Quick start guide

This starter template comes preconfigured with typescript, jest, esbuild and optic rulesets. If you'd like to customize / change the build process, take a look at the [customizing your ruleset package section below](#customizing-your-ruleset-package)

Prerequisites:
- [optic CLI](https://github.com/opticdev/optic/tree/main/projects/optic) installed `npm i -g @useoptic/optic`
- [node](https://nodejs.org/en/)
- your choice of node package management (npm or yarn)

Start by running `npm install` or `yarn install` to install the relevant node_modules. 

Scripts:
- `npm run build` - builds and minifies a ruleset package.
- `npm run publish` - publishes a built ruleset package (from `npm run build`) to optic cloud. Requires an optic token, which is passed in via the `OPTIC_TOKEN` environment variable. See `.env.example` for details.
- `npm run test` - runs tests
- `npm run typecheck` - runs typechecking

### Writing your own rules

This starter template includes [ruleset package](https://github.com/opticdev/optic/tree/main/projects/rulesets-base) which can be used to write rules on different parts of OpenAPI specs. 

```typescript
const has201StatusCode = new OperationRule({
  name: 'Has 201 status codes',
  docsLink: 'https://optic.com/standards/post-operations#statuscode201',
  rule: (operationAssertions) => {
    // You can use the helper
    operationAssertions.requirement.hasResponses([{statusCode: "201"}]);
    // Or you can write this manually
    operationAssertions.requirement((value) => {
      if (!value.responses.get('201'))) {
        throw new RuleError({
          message: 'Operation did not have response with status code 201',
        });
      }
    });
  },
});
```

For more details, view [our guide for writing rules](https://github.com/opticdev/optic/tree/main/projects/rulesets-base#writing-your-own-rules) or our [references](https://github.com/opticdev/optic/blob/main/projects/rulesets-base/docs/Reference.md) for a full list of what you can do with our rules engine.


### Writing tests

A sample test is added under [src/_\_tests__/main.test.ts](./src/__tests__/main.test.ts). `@useoptic/rulesets-base` includes TestHelpers which provides a couple of utilities to write and run tests.

```javascript
const spec = TestHelpers.createEmptySpec() // returns a base OpenAPI spec
const results = TestHelpers.runRulesWithInputs(rules, beforeSpec, afterSpec) // runs rules against a before and after spec
```

### Building and publishing your rulesets

Published rulesets must be bundled into a single file, that exports the name of the ruleset and the rules (see [format below](#customizing-your-ruleset-package)).

This starter template comes pre-configured with a build and publish step that matches the expected output (see the scripts field in the package.json). To publish your ruleset, follow the steps below:
- run `npm run build` - this will bundle the `src/main.ts` code into a single JS file and output it to `build/main.js`
  - this starter template uses esbuild, but any other bundler could be used (e.g. webpack, parcel, etc)
- run `npm run publish` - this will publish the bundled rulesets (`build/main.js`) to optic cloud
  - this package will be then available to be used locally and in optic cloud

#### Getting your own token

A token is required to upload rules to Optic. You can get a token by signing up at [app.useoptic.com](https://app.useoptic.com) and then navigating to the settings page to generate a token.

### Using your rulesets in optic diff and Optic Cloud

Once you have published your ruleset, you can refer to your uploaded ruleset in local runs and optic cloud by it's identifier (`@org-slug/ruleset-name`). You can specify this ruleset in your `optic.dev.yml` file for optic diff running, and specify which rules to run in Optic cloud in the ruleset page on our [app](https://app.useoptic.com).


## Customizing your ruleset package

If you want to update the build environment, CI setup, dependencies or any other set up, you can continue to customize from this starter template. 

The main requirements for a published ruleset are:
- Must be a single bundled JS file
  - i.e. must not import any other packages at run time
- The JS file must include default exports of in the shape of
  ```javascript
    module.exports = {
      name: 'ruleset-name',
      rules: [] // Any valid rule or ruleset, e.g. SpecificationRule, Ruleset, etc
    }
    ```
