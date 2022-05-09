import { IContextualMenuItem, Icon } from '@fluentui/react'
import { assertNotNil, assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import { pickedCSchemaState } from '../model/comp-schema'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ROOT_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import { pickedFCompIdsState, pickedFCompState } from '@/entities/schema'
import { currentSchemaHistoryState, setFSchemaComps } from '@/entities/schema/model/current-schema'
import { removeEntity } from '@/lib/entity-actions'
import ContextualMenu from '@/shared/contextual-menu/contextual-menu'

export default function CompContextualMenu(): JSX.Element | null {
  const { t } = useTranslation()
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const [, setPickedFCompIds] = useRecoilState(pickedFCompIdsState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)

  const items: IContextualMenuItem[] = []

  if (pickedFComp?.id !== ROOT_ID) {
    items.push({
      key: 'remove',
      text: t('buttons.remove'),
      onClick: () => {
        assertNotNull(pickedFComp)
        assertNotNull(currentSchemaHistory)

        const comps = removeEntity(pickedFComp?.id, currentSchemaHistory.data.comps)
        assertNotUndefined(comps)
        setCurrentSchemaHistory(setFSchemaComps(comps))
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
