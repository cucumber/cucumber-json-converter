export type CucumberRubyJson = readonly RubyFeature[]

export type RubyFeature = Readonly<{
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: readonly RubyElement[]
  tags?: readonly RubyTag[]
}>

export type RubyElement = Readonly<{
  start_timestamp?: string
  line: number
  id?: string
  // The scenario_outline type is only used in 2.0.0
  type: 'background' | 'scenario' | 'scenario_outline'
  keyword: string
  name: string
  description: string
  steps: readonly RubyStep[]
  before?: readonly RubyHook[]
  after?: readonly RubyHook[]
  tags?: readonly RubyTag[]
  // Version 2.0.0 allows examples
  examples?: RubyExamples[]
}>

export type RubyExamples = Readonly<{
  id: string
  line: number
  keyword: string
  name: string
  description: string
  rows: readonly RubyExamplesTableRow[],
  tags?: readonly RubyTag[]
}>

export type RubyExamplesTableRow = Readonly<{
  cells: readonly string[]
  id: string
  line: number
}>

export type RubyHook = Readonly<{
  match: RubyMatch
  result: RubyResult
}>

export type RubyStep = Readonly<{
  keyword: string
  line: number
  match?: RubyMatch
  name: string
  // Version 2.0.0 completely omits results from Scenario Outline steps
  result?: RubyResult
  doc_string?: RubyDocString
  rows?: readonly RubyDataTableRow[]
  after?: RubyHook[]
}>

export type RubyDataTableRow = Readonly<{
  cells: readonly string[]
}>

export type RubyDocString = Readonly<{
  value: string
  line: number
  content_type?: string
}>

export type RubyMatch = Readonly<{
  location?: string
  // 7.1.0 does not have arguments. Regression??
  arguments?: readonly RubyArgument[]
}>

export type RubyResult = Readonly<{
  duration?: number
  status: RubyStatus
  error_message?: string
}>

export type RubyStatus = 'passed' | 'failed' | 'skipped' | 'undefined' | 'pending'

export type RubyTag = {
  line: number
  name: string
}

export type RubyArgument = {
  val: string
  offset: number
}
