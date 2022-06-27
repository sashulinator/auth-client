export interface Incident {
  id: string
  name: string
  status: string
  creator: string
  validationStateCd: string
  sourceSystemCd: string
  createdAt: string
  editedAt: string
  data: unknown
}
