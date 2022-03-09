export type CucumberJsJson = readonly Feature[]

export type Feature = Readonly<{
  uri: string
  id: string
  line: number
  keyword: string
  name: string
  description: string
  elements: readonly Element[]
  tags: readonly Tag[]
}>

export type Element = Readonly<{
  id: string
  line: number
  type: 'scenario'
  keyword: string
  name: string
  description: string
  steps: readonly (Step | HookStep)[]
  tags: readonly Tag[]
}>

export type HookStep = Readonly<{
  hidden: boolean
  keyword: string
  result: Result
}>

export type Step = Readonly<{
  arguments: readonly Argument[]
  keyword: string
  line: number
  match?: Match
  name: string
  result: Result
}>

export type Argument = DocString | DataTable

export type DocString = Readonly<{
  content: string
  line: number
}>

export type DataTable = Readonly<{
  rows: readonly Row[]
}>

export type Row = Readonly<{
  cells: readonly string[]
}>

export type Match = Readonly<{
  location: string
}>

export type Result = Readonly<{
  duration: number
  status: Status
  error_message?: string
}>

export type Status = 'passed' | 'failed' | 'skipped' | 'undefined' | 'pending'

export type Tag = Readonly<{
  line: number
  name: string
}>
