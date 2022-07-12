import api from '../api-axios'
import { Transfer } from '../types'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { CreateInputIncident, Incident, UpdateInputIncident } from '@/entities/incident/model/types'

export async function createIncident(
  newFSchema: CreateInputIncident
): Promise<AxiosResponse<Transfer<UpdateInputIncident>>> {
  // TODO провалидировать и выкинуть критичную ошибку

  const response = await api.post('/api/incident', newFSchema, { headers: { objAlias: 'Incident' } })

  if (response.status === 200) {
    // TODO провалидировать и выкинуть критичную ошибку
  }

  return response
}

export function useCreateIncidentMutation(
  options?: UseMutationOptions<Transfer<Incident>, Error, CreateInputIncident>
): UseMutationResult<Transfer<Incident>, Error, CreateInputIncident> {
  const { t } = useTranslation()

  return useMutation<Transfer<Incident>, Error, CreateInputIncident>(queryFn, options)

  async function queryFn(newFSchema: CreateInputIncident): Promise<Transfer<Incident>> {
    try {
      const response = await createIncident(newFSchema)

      if (response.status !== 200) {
        throw new Error(t('errors.responseNot200'))
      }

      return response.data
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(t(`errors.${e.name}`))
      }

      throw new Error('It is not possible but just in case!')
    }
  }
}
