import api from '../api-axios'
import { Transfer } from '../types'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query'

import { Incident, UpdateInputIncident } from '@/entities/incident/model/types'

export async function updateIncident(
  incident: UpdateInputIncident
): Promise<AxiosResponse<Transfer<UpdateInputIncident>>> {
  // TODO провалидировать и выкинуть критичную ошибку

  const response = await api.put(`/api/incident/${incident.instanceId}`, incident, {
    headers: { objAlias: 'Incident' },
  })

  if (response.status === 200) {
    // TODO провалидировать и выкинуть критичную ошибку
  }

  return response
}

export function useUpdateIncidentMutation(
  options?: UseMutationOptions<Transfer<Incident>, Error, UpdateInputIncident>
): UseMutationResult<Transfer<Incident>, Error, UpdateInputIncident> {
  const { t } = useTranslation()

  return useMutation<Transfer<Incident>, Error, UpdateInputIncident>(queryFn, options)

  async function queryFn(incident: UpdateInputIncident): Promise<Transfer<Incident>> {
    try {
      const response = await updateIncident(incident)

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
