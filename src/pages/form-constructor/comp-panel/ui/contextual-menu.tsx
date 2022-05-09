import { IContextualMenuItem, Icon } from '@fluentui/react'
import { assertNotNull, assertNotUndefined } from '@savchenko91/schema-validator'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { ROOT_ID } from '@/constants/common'
import { selectedCompIdsState } from '@/entities/schema'
import { getSelectedComp } from '@/entities/schema/lib/selected-comp'
import { currentSchemaHistoryState, setFSchemaComps } from '@/entities/schema/model/current-schema'
import { removeEntity } from '@/lib/entity-actions'
import ContextualMenu from '@/shared/contextual-menu/contextual-menu'

export default function CompContextualMenu(): JSX.Element | null {
  const { t } = useTranslation()
  const [currentSchemaHistory, setCurrentSchemaHistory] = useRecoilState(currentSchemaHistoryState)
  const [selectedCompIds, setSelectedCompIds] = useRecoilState(selectedCompIdsState)
  const pickedFComp = getSelectedComp(currentSchemaHistory.data, selectedCompIds)

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
        setSelectedCompIds([])
      },
    })
  }

  // TODO
  // if (pickedCSchema) {
  //   items.push({
  //     key: 'open_in_new_tab',
  //     text: 'edit this form',
  //     onClick: () => {
  //       assertNotNil(pickedFComp?.compSchemaId)
  //       const url = ROUTES.FORM_CONSTRUCTOR.buildURL(pickedFComp?.compSchemaId)
  //       window.open(url, '_blanc')?.focus()
  //     },
  //   })
  // }

  return (
    <ContextualMenu items={items}>
      <Icon iconName="More" />
    </ContextualMenu>
  )
}
