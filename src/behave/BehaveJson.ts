export type BehaveJson = readonly BehaveFeature[]

export type BehaveFeature = Readonly<{
  status: BehaveStatus
  location: string
  keyword: string
  name: string
  description?: readonly string[]
  elements: readonly BehaveElement[]
  tags: readonly string[]
}>

export type BehaveElement = Readonly<{
  steps: readonly BehaveStep[]
  type: 'background' | 'scenario'
  name: string
  description?: readonly string[]
  keyword: string
  location: string
  tags?: readonly string[]
  status?: BehaveStatus
}>

export type BehaveStep = Readonly<{
  step_type: string
  name: string
  keyword: string
  location: string
  result?: BehaveResult
  match?: BehaveMatch
  table?: BehaveTable
  text?: string
}>

export type BehaveResult = Readonly<{
  status: BehaveStatus
  duration: number
  error_message?: readonly string[]
}>

export type BehaveMatch = Readonly<{
  location: string
  arguments: readonly BehaveArgument[]
}>

export type BehaveArgument = Readonly<{
  name: string
  value: unknown
  original: string
}>

export type BehaveTable = Readonly<{
  rows: readonly BehaveRow[]
}>

export type BehaveRow = readonly string[]

export type BehaveStatus = 'passed' | 'failed' | 'skipped' | 'undefined'
