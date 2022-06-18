import { ValidationError } from '@savchenko91/schema-validator'

import { EventBindingType } from '../model/types'
import { assertEventBindings } from './assertions'
import { onFieldChange } from './events'

describe(`${assertEventBindings.name}`, () => {
  it('valid', () => {
    assertEventBindings({
      testId: {
        id: 'testId',
        name: onFieldChange.name,
        type: EventBindingType.EVENT,
        children: [],
      },
    })
  })

  it('invalid if event child is not an action', () => {
    try {
      assertEventBindings({
        eventId1: {
          id: 'eventId',
          name: onFieldChange.name,
          type: EventBindingType.EVENT,
          children: ['eventId2'],
        },
        eventId2: {
          id: 'eventId2',
          name: onFieldChange.name,
          type: EventBindingType.EVENT,
          children: [],
        },
      })
    } catch (e) {
      if (e instanceof ValidationError) {
        expect({ ...e }).toEqual({
          _code: 'assertEventBindings',
          _message: 'must be an action',
          _inputName: 'eventId2',
          _path: 'eventId2',
        })
      }
      throw new Error('must be ValidationError')
    }
  })

  it('invalid if no events', () => {
    try {
      assertEventBindings({
        eventId1: {
          id: 'eventId',
          name: onFieldChange.name,
          type: EventBindingType.ACTION,
          children: ['eventId2'],
        },
      })
    } catch (e) {
      if (e instanceof ValidationError) {
        expect({ ...e }).toEqual({
          _code: 'assertEventBindings',
          _message: 'no events',
          _inputName: 'eventBindings',
          _path: 'eventBindings',
        })
      }
      throw new Error('must be ValidationError')
    }
  })
})
