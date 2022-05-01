import { ContextualMenu, IContextualMenuItem, Icon } from '@fluentui/react'
import { assertNotNil, assertNotNull } from '@savchenko91/schema-validator'

import './contextual-menu.css'

import { pickedCSchemaState } from '../model/comp-schema'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { ROOT_COMP_ID } from '@/constants/common'
import ROUTES from '@/constants/routes'
import { removeComp } from '@/helpers/form-schema-state'
import { FSchemaState, pickedFCompIdState, pickedFCompState } from '@/pages/form-constructor/preview/model/form-schema'
import useBoolean from '@/utils/use-boolean'

export default function CompContextualMenu(): JSX.Element | null {
  const { t } = useTranslation()
  const [FSchema, setFSchema] = useRecoilState(FSchemaState)
  const [, setPickedFCompId] = useRecoilState(pickedFCompIdState)
  const pickedFComp = useRecoilValue(pickedFCompState)
  const pickedCSchema = useRecoilValue(pickedCSchemaState)

  const [isVisible, , hide, toggle] = useBoolean(false)
  const buttonRef = useRef(null)

  const items: IContextualMenuItem[] = []

  if (pickedFComp?.id !== ROOT_COMP_ID) {
    items.push({
      key: 'remove',
      text: t('buttons.remove'),
      onClick: () => {
        assertNotNull(pickedFComp)
        assertNotNull(FSchema)

        const comps = removeComp(pickedFComp?.id, FSchema.comps)
        setFSchema({ ...FSchema, comps: comps })
        setPickedFCompId('')
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
    <div className="CompContextualMenu">
      <>
        <div className="compContextualMenubackground" />
        <a ref={buttonRef} href="#" onClick={toggle}>
          <Icon iconName="More" />
        </a>
        <ContextualMenu items={items} hidden={!isVisible} target={buttonRef} onItemClick={hide} onDismiss={hide} />
      </>
    </div>
  )
}
