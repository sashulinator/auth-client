import { FontIcon, PrimaryButton, SearchBox } from '@fluentui/react'

import PaletteModal, { paletteModalState } from '../../palette-modal'
import KeyListener from './key-listener'
import PanelTree from './tree'
import clsx from 'clsx'
import React, { LegacyRef, forwardRef } from 'react'
import { useRecoilState } from 'recoil'

import { useDebounce } from '@/lib/use-debaunce'
import withFocus from '@/lib/with-focus'
import ResizeTarget from '@/shared/resize-target'
import { Comp, CompSchema, CreateCompSchema, Dictionary, LinkedComp } from '@/shared/schema-drawer'

interface TreePanelProps {
  toggleCompSelection: (compId: string | string[]) => void
  schema: CompSchema | CreateCompSchema | null
  selectedCompIds: string[]
  upsertComps: (comps: Dictionary<Comp | LinkedComp>) => void
  isLoading: boolean
  schemas: Dictionary<CompSchema> | null
  searchQuery?: string
  updateComp: (comp: Comp) => void
  isCurrentSchemaLoading: boolean
  isDependencySchemasLoading: boolean
  addNewComps: (comps: Dictionary<Comp | LinkedComp>) => void
  isFocused: boolean
  ref: LegacyRef<HTMLDivElement | null>
  removeSelectedComps: () => void
  pasteFromClipboard: () => void
  copyToClipboard: () => void
  undo: () => void
  redo: () => void
}

const TreePanel = forwardRef<HTMLDivElement | null, TreePanelProps>(function TreePanel(props, ref): JSX.Element | null {
  const [searchQuery, setFilterString] = useDebounce<string | undefined>(undefined, 1000)
  const [, setPaletteOpen] = useRecoilState(paletteModalState)

  return (
    <>
      <PaletteModal addNewComps={props.addNewComps} toggleCompSelection={props.toggleCompSelection} />
      <div className={clsx('TreePanel', props.isFocused && 'isFocused')} ref={ref}>
        {props.schema && (
          <>
            <KeyListener
              selectedCompIds={props.selectedCompIds}
              schema={props.schema}
              toggleCompSelection={props.toggleCompSelection}
              removeSelectedComps={props.removeSelectedComps}
              pasteFromClipboard={props.pasteFromClipboard}
              copyToClipboard={props.copyToClipboard}
              undo={props.undo}
              redo={props.redo}
              isFocused={props.isFocused}
            />
            <ResizeTarget name="treePanelWidth" direction="left" callapsible={true} />
            {!props.isCurrentSchemaLoading && (
              <SearchBox
                autoComplete="off"
                className="treeSearchBox"
                onChange={(ev: unknown, value?: string) => setFilterString(value)}
              />
            )}
            {!props.isCurrentSchemaLoading && !props.isDependencySchemasLoading && (
              <PrimaryButton className="addCompButton" onClick={() => setPaletteOpen(true)}>
                <FontIcon aria-label="Add Comp" iconName="Add" />
              </PrimaryButton>
            )}
            <PanelTree
              schema={props.schema}
              schemas={props.schemas}
              toggleCompSelection={props.toggleCompSelection}
              upsertComps={props.upsertComps}
              selectedCompIds={props.selectedCompIds}
              isLoading={props.isCurrentSchemaLoading}
              searchQuery={searchQuery}
              updateComp={props.updateComp}
            />
          </>
        )}
      </div>
    </>
  )
})

export default withFocus(TreePanel)
