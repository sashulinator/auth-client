import { DatePicker as FluentDatePicker, IDatePickerProps } from '@fluentui/react'
import { isObject } from '@savchenko91/schema-validator'

import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DatePicker(props: IDatePickerProps): JSX.Element {
  const isIcorrectData = isObject(props.value) && !(props.value instanceof Date)
  const { t } = useTranslation()

  const strings = {
    months: [
      t('calendar.months.January'),
      t('calendar.months.February'),
      t('calendar.months.March'),
      t('calendar.months.April'),
      t('calendar.months.May'),
      t('calendar.months.June'),
      t('calendar.months.July'),
      t('calendar.months.August'),
      t('calendar.months.September'),
      t('calendar.months.October'),
      t('calendar.months.November'),
      t('calendar.months.December'),
    ],
    shortMonths: [
      t('calendar.shortMonths.Jan'),
      t('calendar.shortMonths.Feb'),
      t('calendar.shortMonths.Mar'),
      t('calendar.shortMonths.Apr'),
      t('calendar.shortMonths.May'),
      t('calendar.shortMonths.Jun'),
      t('calendar.shortMonths.Jul'),
      t('calendar.shortMonths.Aug'),
      t('calendar.shortMonths.Sep'),
      t('calendar.shortMonths.Oct'),
      t('calendar.shortMonths.Nov'),
      t('calendar.shortMonths.Dec'),
    ],
    days: [
      t('calendar.days.Sunday'),
      t('calendar.days.Monday'),
      t('calendar.days.Thusday'),
      t('calendar.days.Wednesday'),
      t('calendar.days.Thursday'),
      t('calendar.days.Friday'),
      t('calendar.days.Saturday'),
    ],
    shortDays: [
      t('calendar.shortDays.Sunday'),
      t('calendar.shortDays.Monday'),
      t('calendar.shortDays.Tuesday'),
      t('calendar.shortDays.Wednesday'),
      t('calendar.shortDays.Thursday'),
      t('calendar.shortDays.Friday'),
      t('calendar.shortDays.Saturday'),
    ],
    goToToday: t('calendar.goToToday'),
    prevMonthAriaLabel: t('calendar.prevMonthAriaLabel'),
    nextMonthAriaLabel: t('calendar.nextMonthAriaLabel'),
    prevYearAriaLabel: t('calendar.prevYearAriaLabel'),
    nextYearAriaLabel: t('calendar.nextYearAriaLabel'),
  }

  return (
    <FluentDatePicker
      {...props}
      strings={strings}
      value={isIcorrectData ? undefined : props.value}
      onSelectDate={(e) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        props?.onChange?.(e as any)
      }}
      formatDate={(date) => date?.toLocaleDateString(t('locale')) || ''}
      firstDayOfWeek={parseInt(t('calendar.firstDayOfTheWeek'), 10) ?? 1}
      disabled={isIcorrectData}
    />
  )
}
