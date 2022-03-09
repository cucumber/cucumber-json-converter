export type CucumberJvmJson = readonly Feature[]

export type Feature = Readonly<{
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: readonly Element[]
  tags?: readonly LocationTag[]
}>

export type Element = Readonly<{
  start_timestamp?: string
  line: number
  id?: string
  type: 'background' | 'scenario'
  keyword: string
  name: string
  description: string
  steps: readonly Step[]
  before?: readonly Hook[]
  after?: readonly Hook[]
  tags?: readonly Tag[]
}>

export type Hook = Readonly<{
  match: Match
  result: Result
}>

export type Step = Readonly<{
  keyword: string
  line: number
  match?: Match
  name: string
  result: Result
  doc_string?: DocString
  rows?: readonly DataTableRow[]
}>

export type DataTableRow = Readonly<{
  cells: readonly string[]
}>

export type DocString = Readonly<{
  line: number
  value: string
  content_type?: string
}>

export type Match = Readonly<{
  location?: string
  arguments?: readonly Argument[]
}>

export type Result = Readonly<{
  duration?: number
  status: Status
  error_message?: string
}>

export type Status = 'passed' | 'failed' | 'skipped' | 'undefined'

export type Tag = Readonly<{
  name: string
}>

// For Cucumber-JVM 7.0.1, the Feature level tag does not have a *line*,
// but instead it has a *location* (and a *type*).
export type LocationTag = Readonly<{
  name: string
  type: string
  location: Location
}>

export type Location = Readonly<{
  line: number
  column: number
}>

export type Argument = {
  val: string
  offset: number
}
