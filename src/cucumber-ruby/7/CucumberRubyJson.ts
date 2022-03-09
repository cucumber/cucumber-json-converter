export type CucumberRubyJson = readonly Feature[]

export type Feature = Readonly<{
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
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
  after?: Hook[]
}>

export type DataTableRow = Readonly<{
  cells: readonly string[]
}>

export type DocString = Readonly<{
  value: string
  line: number
  content_type?: string
}>

export type Match = Readonly<{
  location?: string
}>

export type Result = Readonly<{
  duration?: number
  status: Status
  error_message?: string
}>

export type Status = 'passed' | 'failed' | 'skipped' | 'undefined' | 'pending'

export type Tag = {
  line: number
  name: string
}
