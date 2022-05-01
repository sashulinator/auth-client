import { PrimaryButton } from '@fluentui/react'

import { FSchemaState } from '../model/form-schema'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

function SaveButton(): JSX.Element {
  const { t } = useTranslation()
  const [FSchema] = useRecoilState(FSchemaState)

  async function onClick() {
    const response = await fetch('/api/v1/schemas', {
      method: 'PUT',
      body: JSON.stringify(FSchema),
      headers: {
        'content-type': 'application/json',
        accept: '*/*',
      },
    })

    if (!response.ok) {
      // TODO обработать ошибку
      throw new Error('Problem fetching data')
    }
  }

  return <PrimaryButton onClick={onClick}>{t('buttons.save').toString()}</PrimaryButton>
}

export default SaveButton
