import { Any, AnyRecord } from './common'

export type Dictionary<T> = Record<string, T>

export type Package<TRecord = AnyRecord, TData = Any> = {
  data: TData
} & TRecord
