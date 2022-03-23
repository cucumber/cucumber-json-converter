# Cucumber JSON Converter

This library converts Cucumber JSON from multiple implementations and versions into a JavaScript object with
a strict schema.

## Usage

```typescript
const ob = JSON.parse(jsonFromAnyCucumberImplementation)
const cucumberJsonObject = convert(ob)
```

The `convert` function will throw an error if it fails to recognize the object as a valid Cucumber JSON object.

## Motivation

The "Cucumber JSON" format was created several years before the [JSON Schema](https://json-schema.org/) standard started gaining traction. The lack of a formal schema led to inconsistencies between different Cucumber implementations and releases.

This library contains JSON Schemas for multiple implementations and versions of Cucumber.
These schemas have been retrofitted to match the actual output of these implementations.
