/**
 * !GET INCIDENT / GET
 */
import api from '../api-axios'
import { Transfer } from '../types'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'

import { Incident } from '@/entities/incident/model/types'
import { Id } from '@/types/common'

export async function getIncident(id: Id): Promise<AxiosResponse<Transfer<Incident>>> {
  // TODO провалидировать и выкинуть критичную ошибку

  const response = await api.get<Transfer<Incident>>(`/api/incident/${id}`)

  if (response.status === 200) {
    // TODO провалидировать и выкинуть критичную ошибку
  }

  // TODO костыль!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(response.data.dataBlock as any).action = 'save'

  return response
}

export function useGetIncident(id: Id | undefined) {
  const { t } = useTranslation()
  return useQuery([useGetIncident.name, id], queryFn)

  async function queryFn(): Promise<Transfer<Incident> | Error | undefined> {
    if (id === undefined) {
      return
    }

    try {
      const response = await getIncident(id)

      if (response.status !== 200) {
        return new Error(t('errors.responseNot200'))
      }

      return response.data
    } catch (e) {
      if (e instanceof Error) {
        return new Error(t(`errors.${e.name}`))
      }

      throw new Error('It is not possible but just in case!')
    }
  }
}
