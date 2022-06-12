import { registerIcons } from '@fluentui/react/lib/Styling'

import React from 'react'

registerIcons({
  icons: {
    More: (
      <svg width="1em" height="1em" viewBox="0 0 105 35" fill="currentColor">
        <circle cx={17.5} cy={17.5} r={17.5} />
        <circle cx={87.5} cy={17.5} r={17.5} />
      </svg>
    ),
    HorizontalLine: (
      <svg width="1em" height="1em" viewBox="0 0 100 100" fill="none">
        <rect y="40" width="100" height="20" fill="currentColor" />
      </svg>
    ),
  },
})
