export type CucumberJson = {
  implementation: string
  features: readonly CucumberJsonFeature[]
}

export type CucumberJsonFeature = Readonly<{
  uri: string
  id?: string
  line?: number
  keyword: string
  name: string
  description?: string
  elements: readonly CucumberJsonElement[]
  tags?: readonly CucumberJsonTag[]
}>

export type CucumberJsonElement = Readonly<{
  start_timestamp?: string
  line: number
  id?: string
  type: CucumberJsonElementType
  keyword: string
  name: string
  description: string
  before?: readonly CucumberJsonHook[]
  steps: readonly CucumberJsonStep[]
  after?: readonly CucumberJsonHook[]
  tags?: readonly CucumberJsonTag[]
}>

export type CucumberJsonElementType = 'background' | 'scenario'

export type CucumberJsonHook = Readonly<{
  match?: CucumberJsonMatch
  result: CucumberJsonResult
}>

export type CucumberJsonStep = Readonly<{
  keyword: string
  line: number
  match?: CucumberJsonMatch
  name: string
  result: CucumberJsonResult
  doc_string?: CucumberJsonDocString
  rows?: readonly CucumberJsonDataTableRow[]
}>

export type CucumberJsonDataTableRow = Readonly<{
  cells: readonly string[]
}>

export type CucumberJsonDocString = Readonly<{
  line: number
  value: string
  content_type?: string
}>

export type CucumberJsonMatch = Readonly<{
  location?: string
  arguments?: readonly CucumberJsonArgument[]
}>

export type CucumberJsonArgument = Readonly<{
  value: string
  offset: number
}>

export type CucumberJsonResult = Readonly<{
  duration?: number
  status: CucumberJsonStatus
  error_message?: string
}>

// The unknown value is used if the original result was missing. This is the case for e.g.
// Scenario Outline steps on Cucumber-Ruby 2.0.0
export type CucumberJsonStatus =
  | 'passed'
  | 'failed'
  | 'skipped'
  | 'undefined'
  | 'pending'
  | 'unknown'

export type CucumberJsonTag = Readonly<{
  name: string
  line?: number
}>
