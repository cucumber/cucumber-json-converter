export type BehaveJson = readonly Feature[]

export type Feature = Readonly<{
  status: Status
  location: string
  keyword: string
  name: string
  description?: readonly string[]
  elements: readonly Element[]
  tags: readonly string[]
}>

export type Element = Readonly<{
  steps: readonly Step[]
  type: 'background' | 'scenario'
  name: string
  description?: readonly string[]
  keyword: string
  location: string
  tags?: readonly string[]
  status?: Status
}>

export type Step = Readonly<{
  step_type: string
  name: string
  keyword: string
  location: string
  result?: Result
  match?: Match
  table?: Table
  text?: string
}>

export type Result = Readonly<{
  status: Status
  duration: number
  error_message?: readonly string[]
}>

export type Match = Readonly<{
  location: string
  arguments: readonly Argument[]
}>

export type Argument = Readonly<{
  name: string
  value: unknown
  original: string
}>

export type Table = Readonly<{
  rows: readonly Row[]
}>

export type Row = readonly string[]

export type Status = 'passed' | 'failed' | 'skipped' | 'undefined'
