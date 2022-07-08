import { Stack } from '@fluentui/react'

import cx from 'clsx'
import React, { FC } from 'react'

import LanguageDropdown from '@/shared/language-dropdown'
import ThemeDropdown from '@/shared/theme'

type UserProfileProps = {
  className?: string
}

const UserProfile: FC<UserProfileProps> = (): JSX.Element => {
  return (
    <div className={cx('mainLayout')}>
      <Stack as="main" className="UserProfile">
        <Stack as="ul" tokens={{ childrenGap: 24, padding: '32px 0 0 0' }}>
          <li>
            <LanguageDropdown />
          </li>
          <li>
            <ThemeDropdown />
          </li>
        </Stack>
      </Stack>
    </div>
  )
}

export default UserProfile
