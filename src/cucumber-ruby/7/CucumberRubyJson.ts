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
  type: 'background' | 'scenario'
  keyword: string
  name: string
  description: string
  steps: readonly RubyStep[]
  before?: readonly RubyHook[]
  after?: readonly RubyHook[]
  tags?: readonly RubyTag[]
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
  result: RubyResult
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
