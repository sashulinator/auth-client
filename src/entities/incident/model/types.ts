export interface Incident {
  instance_id: string
  name: string
  status: string
  creator: string
  updator: string
  validation_state_cd: string
  source_system_cd: string
  created_dttm: string
  data: unknown
}

export type CreateInputIncident = Omit<Incident, 'instance_id' | 'creator' | 'updator' | 'data'>

export type UpdateInputIncident = Omit<Incident, 'instance_id'>
