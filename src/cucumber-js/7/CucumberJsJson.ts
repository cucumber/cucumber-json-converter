export type CucumberJsJson = readonly JsFeature[]

export type JsFeature = Readonly<{
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  // 6.0.5 can omit description
  description?: string
  elements: readonly JsElement[]
  tags: readonly JsTag[]
}>

export type JsElement = Readonly<{
  id: string
  line: number
  type: 'scenario'
  keyword: string
  name: string
  // 6.0.5 can omit description
  description?: string
  steps: readonly JsStepOrHook[]
  tags: readonly JsTag[]
}>

export type JsStepOrHook = JsStep | JsHookStep

export type JsStep = Readonly<{
  arguments: readonly JsArgument[]
  keyword: string
  line: number
  match?: JsMatch
  name: string
  result: JsResult
}>

export type JsHookStep = Readonly<{
  hidden: true
  keyword: string
  // 6.0.5 has match, but 7.3.2 does not
  match?: JsMatch
  result: JsResult
}>

export type JsArgument = JsDocString | JsDataTable

export type JsDocString = Readonly<{
  content: string
  line: number
}>

export type JsDataTable = Readonly<{
  rows: readonly JsRow[]
}>

export type JsRow = Readonly<{
  cells: readonly string[]
}>

export type JsMatch = Readonly<{
  location: string
}>

export type JsResult = Readonly<{
  // 6.0.5 does not set duration for undefined steps
  duration?: number
  status: JsStatus
  error_message?: string
}>

export type JsStatus = 'passed' | 'failed' | 'skipped' | 'undefined' | 'pending'

export type JsTag = Readonly<{
  line: number
  name: string
}>
