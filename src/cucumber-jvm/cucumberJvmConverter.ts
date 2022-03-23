import {
  CucumberJsonElement,
  CucumberJsonFeature,
  CucumberJsonHook,
  CucumberJsonMatch,
  CucumberJsonStep,
  CucumberJsonTag,
} from '../CucumberJson.js'
import { Converter } from '../types'
import {
  CucumberJvmJson,
  JvmElement,
  JvmFeature,
  JvmHook,
  JvmLocationTag,
  JvmMatch,
  JvmStep,
} from './CucumberJvmJson.js'

export const cucumberJvmConverter: Converter = (json: CucumberJvmJson) => {
  return {
    implementation: 'cucumber-jvm',
    features: json.map(jvmFeatureToFeature),
  }
}

function jvmFeatureToFeature(feature: JvmFeature): CucumberJsonFeature {
  const tags: readonly CucumberJsonTag[] = (feature.tags || []).map(locationTagToTag)
  const elements: readonly CucumberJsonElement[] = feature.elements.map(jvmElementToElement)

  return {
    description: feature.description,
    elements,
    id: feature.id,
    keyword: feature.keyword,
    line: feature.line,
    name: feature.name,
    tags,
    uri: feature.uri,
  }
}

function locationTagToTag(locationTag: JvmLocationTag): CucumberJsonTag {
  return {
    name: locationTag.name,
    line: locationTag.location.line,
  }
}

function jvmElementToElement(jvmElement: JvmElement): CucumberJsonElement {
  const before: readonly CucumberJsonHook[] = (jvmElement.before || []).map(jvmHookToHook)
  const steps: readonly CucumberJsonStep[] = jvmElement.steps.map(jvmStepToStep)
  const after: readonly CucumberJsonHook[] = (jvmElement.after || []).map(jvmHookToHook)

  return {
    ...jvmElement,
    ...{
      before,
      steps,
      after,
    },
  }
}

function jvmHookToHook(jvmHook: JvmHook): CucumberJsonHook {
  return {
    result: jvmHook.result,
    match: jvmMatchToMatch(jvmHook.match),
  }
}

function jvmMatchToMatch(jvmMatch: JvmMatch): CucumberJsonMatch {
  return {
    location: jvmMatch.location,
  }
  // return {
  //   ...jvmMatch,
  //   ...{
  //     arguments: (jvmMatch.arguments || []).map((arg) => ({
  //       value: arg.val,
  //       offset: arg.offset,
  //     })),
  //   },
  // }
}

function jvmStepToStep(jvmStep: JvmStep): CucumberJsonStep {
  return {
    ...jvmStep,
    ...{
      match: jvmStep.match ? jvmMatchToMatch(jvmStep.match) : undefined,
    },
  }
}
