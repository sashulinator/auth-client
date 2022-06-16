import { DatePicker as FluentDatePicker, IDatePickerProps } from '@fluentui/react'
import { isStringifiedNumber } from '@savchenko91/schema-validator'

import React from 'react'
import { useTranslation } from 'react-i18next'

interface DatePickerProps extends Omit<IDatePickerProps, 'value' | 'onChange'> {
  value?: string
  onChange: (value: string) => void
}

export default function DatePicker(props: DatePickerProps): JSX.Element {
  const { onChange, ...restProps } = props

  const numberValue = isStringifiedNumber(props.value?.toString()) ? parseInt(props.value || '', 10) : undefined
  const value = numberValue ? new Date(numberValue * 1000) : undefined

  const { t } = useTranslation()

  const strings = {
    months: [
      t('t.calendar.months.January'),
      t('t.calendar.months.February'),
      t('t.calendar.months.March'),
      t('t.calendar.months.April'),
      t('t.calendar.months.May'),
      t('t.calendar.months.June'),
      t('t.calendar.months.July'),
      t('t.calendar.months.August'),
      t('t.calendar.months.September'),
      t('t.calendar.months.October'),
      t('t.calendar.months.November'),
      t('t.calendar.months.December'),
    ],
    shortMonths: [
      t('t.calendar.shortMonths.Jan'),
      t('t.calendar.shortMonths.Feb'),
      t('t.calendar.shortMonths.Mar'),
      t('t.calendar.shortMonths.Apr'),
      t('t.calendar.shortMonths.May'),
      t('t.calendar.shortMonths.Jun'),
      t('t.calendar.shortMonths.Jul'),
      t('t.calendar.shortMonths.Aug'),
      t('t.calendar.shortMonths.Sep'),
      t('t.calendar.shortMonths.Oct'),
      t('t.calendar.shortMonths.Nov'),
      t('t.calendar.shortMonths.Dec'),
    ],
    days: [
      t('t.calendar.days.Sunday'),
      t('t.calendar.days.Monday'),
      t('t.calendar.days.Thusday'),
      t('t.calendar.days.Wednesday'),
      t('t.calendar.days.Thursday'),
      t('t.calendar.days.Friday'),
      t('t.calendar.days.Saturday'),
    ],
    shortDays: [
      t('t.calendar.shortDays.Sunday'),
      t('t.calendar.shortDays.Monday'),
      t('t.calendar.shortDays.Tuesday'),
      t('t.calendar.shortDays.Wednesday'),
      t('t.calendar.shortDays.Thursday'),
      t('t.calendar.shortDays.Friday'),
      t('t.calendar.shortDays.Saturday'),
    ],
    goToToday: t('t.calendar.goToToday'),
    prevMonthAriaLabel: t('t.calendar.prevMonthAriaLabel'),
    nextMonthAriaLabel: t('t.calendar.nextMonthAriaLabel'),
    prevYearAriaLabel: t('t.calendar.prevYearAriaLabel'),
    nextYearAriaLabel: t('t.calendar.nextYearAriaLabel'),
  }

  return (
    <FluentDatePicker
      {...restProps}
      strings={strings}
      value={value}
      onSelectDate={(e) => {
        if (!e) {
          return
        }

        const unixTimestamp = e.getTime() / 1000
        onChange(unixTimestamp.toString())
      }}
      formatDate={(date) => date?.toLocaleDateString(t('locale')) || ''}
      firstDayOfWeek={parseInt(t('t.calendar.firstDayOfTheWeek'), 10) ?? 1}
    />
  )
}
