export type CucumberJson = {
  implementation: string
  features: readonly Feature[]
}

export type Feature = Readonly<{
  uri: string
  id?: string
  line?: number
  keyword: string
  name: string
  description?: string
  elements: readonly Element[]
  tags?: readonly Tag[]
}>

export type Element = Readonly<{
  start_timestamp?: string
  line: number
  id?: string
  type: 'background' | 'scenario'
  keyword: string
  name: string
  description: string
  before?: readonly Hook[]
  steps: readonly Step[]
  after?: readonly Hook[]
  tags?: readonly Tag[]
}>

export type Hook = Readonly<{
  match?: Match
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

export type Argument = Readonly<{
  value: string
  offset: number
}>

export type Result = Readonly<{
  duration?: number
  status: Status
  error_message?: string
}>

export type Status = 'passed' | 'failed' | 'skipped' | 'undefined' | 'pending'

export type Tag = Readonly<{
  name: string
  line?: number
}>
