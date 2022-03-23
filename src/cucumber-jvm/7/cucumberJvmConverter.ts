import { Element, Feature, Hook, Match, Step, Tag } from '../../CucumberJson.js'
import { Converter } from '../../types'
import {
  CucumberJvmJson,
  JvmElement,
  JvmFeature,
  JvmHook,
  JvmLocationTag,
  JvmMatch,
  JvmStep,
} from './CucumberJvmJson.js'

export const cucumberJvmConverter: Converter<CucumberJvmJson> = (json) => {
  return {
    implementation: 'cucumber-jvm',
    features: json.map(jvmFeatureToFeature),
  }
}

function jvmFeatureToFeature(feature: JvmFeature): Feature {
  const tags: readonly Tag[] = (feature.tags || []).map(locationTagToTag)
  const elements: readonly Element[] = feature.elements.map(jvmElementToElement)

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

function locationTagToTag(locationTag: JvmLocationTag): Tag {
  return {
    name: locationTag.name,
    line: locationTag.location.line,
  }
}

function jvmElementToElement(jvmElement: JvmElement): Element {
  const before: readonly Hook[] = (jvmElement.before || []).map(jvmHookToHook)
  const steps: readonly Step[] = jvmElement.steps.map(jvmStepToStep)
  const after: readonly Hook[] = (jvmElement.after || []).map(jvmHookToHook)

  return {
    ...jvmElement,
    ...{
      before,
      steps,
      after,
    },
  }
}

function jvmHookToHook(jvmHook: JvmHook): Hook {
  return {
    result: jvmHook.result,
    match: jvmMatchToMatch(jvmHook.match),
  }
}

function jvmMatchToMatch(jvmMatch: JvmMatch): Match {
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

function jvmStepToStep(jvmStep: JvmStep): Step {
  return {
    ...jvmStep,
    ...{
      match: jvmStep.match ? jvmMatchToMatch(jvmStep.match) : undefined,
    },
  }
}
