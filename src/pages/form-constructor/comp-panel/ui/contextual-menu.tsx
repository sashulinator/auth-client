import { IContextualMenuItem, Icon } from '@fluentui/react'
import { assertNotNil, assertNotNull } from '@savchenko91/schema-validator'

import { pickedCSchemaState } from '../model/comp-schema'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ROOT_COMP_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import { removeComp } from '@/helpers/form-schema-state'
import {
  FSchemaHistoryState,
  pickedFCompIdsState,
  pickedFCompState,
  setFSchemaComps,
} from '@/pages/form-constructor/preview/model/form-schema'
import ContextualMenu from '@/shared/contextual-menu'

export default function CompContextualMenu(): JSX.Element | null {
  const { t } = useTranslation()
  const [FSchemaHistory, setFSchemaHistory] = useRecoilState(FSchemaHistoryState)
  const [, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)

  const items: IContextualMenuItem[] = []

  if (pickedFComp?.id !== ROOT_COMP_ID) {
    items.push({
      key: 'remove',
      text: t('buttons.remove'),
      onClick: () => {
        assertNotNull(pickedFComp)
        assertNotNull(FSchemaHistory)

        const comps = removeComp(pickedFComp?.id, FSchemaHistory.data.comps)
        setFSchemaHistory(setFSchemaComps(comps))
        setPickedFCompIds([])
      },
    })
  }

  if (pickedCSchema) {
    items.push({
      key: 'open_in_new_tab',
      text: 'edit this form',
      onClick: () => {
        assertNotNil(pickedFComp?.compSchemaId)
        const url = ROUTES.FORM_CONSTRUCTOR.buildURL(pickedFComp?.compSchemaId)
        window.open(url, '_blanc')?.focus()
      },
    })
  }

  return (
    <ContextualMenu items={items}>
      <Icon iconName="More" />
    </ContextualMenu>
  )
}
