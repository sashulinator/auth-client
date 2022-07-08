import { IContextualMenuItem, Icon } from '@fluentui/react'

import React from 'react'
import { useTranslation } from 'react-i18next'

import { ROOT_ID } from '@/constants/common'
import ContextualMenu from '@/shared/contextual-menu/contextual-menu'
import { Comp, CompSchema, Dictionary, LinkedComp, isLinkedComp } from '@/shared/schema-drawer'

interface CompContextualMenuProps {
  remove: (compId: string) => void
  openSchemaInNewTab: (schemaId: string) => void
  schemas: Dictionary<CompSchema> | null
  comp: Comp | LinkedComp
}

export function CompContextualMenu(props: CompContextualMenuProps): JSX.Element | null {
  const { t } = useTranslation()
  const comp = props.comp
  const items: IContextualMenuItem[] = []

  if (isLinkedComp(comp)) {
    return null
  }

  if (props.comp.id !== ROOT_ID) {
    items.push({
      key: 'remove',
      text: t('t.buttons.remove'),
      onClick: () => props.remove(props.comp.id),
    })
  }

  if (props.schemas?.[comp.compSchemaId]) {
    items.push({
      key: 'editThisForm',
      text: t('t.formConstructorPage.editThisForm'),
      onClick: () => props.openSchemaInNewTab(comp.compSchemaId),
    })
  }

  return (
    <ContextualMenu items={items}>
      <Icon iconName="More" />
    </ContextualMenu>
  )
}
