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

TODO

### Writing tests

TODO

### Building and Publishing your rulesets

TODO

#### Getting your own token
TODO

### Using your rulesets in optic diff and Optic Cloud
TODO

## Customizing your ruleset package

If you want to update the build environment, CI setup, dependencies or any other set up, you can continue to customize from this starter template. 

The main requirements for a published ruleset are:
- Must be a single bundled JS file
  - i.e. must not import any other packages at run time
- The JS file must include default exports of in the shape of
  ```
    module.exports = {
      name: 'ruleset-name',
      rules: [] // Any valid rule or ruleset, e.g. SpecificationRule, Ruleset, etc
    }
    ```

## How it works
TODO