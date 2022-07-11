export interface Incident {
  instanceId: string
  name: string
  status: string
  creator: string
  updator: string
  validationStateCd: string
  sourceSystemCd: string
  createdDttm: string
  data: unknown
}

export type CreateInputIncident = Omit<Incident, 'instance_id' | 'creator' | 'updator' | 'data'>

export type UpdateInputIncident = Incident
