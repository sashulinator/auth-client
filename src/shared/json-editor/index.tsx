import React, { Suspense, lazy } from 'react'

import { JSONEditorProps } from '@/shared/json-editor/ui/json-editor'

const LazyComponent = lazy(async () => import('./ui/json-editor'))

function JSONEditor(props: JSONEditorProps): JSX.Element {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default JSONEditor
