export type CucumberJvmJson = readonly JvmFeature[]

export type JvmFeature = Readonly<{
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: readonly JvmElement[]
  tags?: readonly JvmLocationTag[]
}>

export type JvmElement = Readonly<{
  start_timestamp?: string
  line: number
  id?: string
  type: 'background' | 'scenario'
  keyword: string
  name: string
  description: string
  steps: readonly JvmStep[]
  before?: readonly JvmHook[]
  after?: readonly JvmHook[]
  tags?: readonly JvmTag[]
}>

export type JvmHook = Readonly<{
  match: JvmMatch
  result: JvmResult
}>

export type JvmStep = Readonly<{
  keyword: string
  line: number
  match?: JvmMatch
  name: string
  result: JvmResult
  doc_string?: JvmDocString
  rows?: readonly JvmDataTableRow[]
}>

export type JvmDataTableRow = Readonly<{
  cells: readonly string[]
}>

export type JvmDocString = Readonly<{
  line: number
  value: string
  content_type?: string
}>

export type JvmMatch = Readonly<{
  location?: string
  arguments?: readonly JvmArgument[]
}>

export type JvmResult = Readonly<{
  duration?: number
  status: JvmStatus
  error_message?: string
}>

export type JvmStatus = 'passed' | 'failed' | 'skipped' | 'undefined' | 'pending'

export type JvmTag = Readonly<{
  name: string
}>

// For Cucumber-JVM 7.0.1, the Feature level tag does not have a *line*,
// but instead it has a *location* (and a *type*).
export type JvmLocationTag = Readonly<{
  name: string
  type: string
  location: JvmLocation
}>

export type JvmLocation = Readonly<{
  line: number
  column: number
}>

export type JvmArgument = {
  val: string
  offset: number
}
