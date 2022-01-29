/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { StageActionTypes, REDUX_API_MIDDLEWARE as type } from '@savchenko91/rc-redux-api-mw'

import { DecorateAll } from 'decorate-all'
import { combineReducers } from 'redux'

import { createAPIconstant } from '@/utils/create-api-constants'
import { createAPIReducer } from '@/utils/create-api-reducer'
import uncapitalize from '@/utils/uncapitalize'

export default class APIReduxBuilder {
  initialState: any
  reducers: Record<string, any>

  constructor(initialState: any) {
    const name = uncapitalize(this.constructor.name)

    this.initialState = initialState
    this.reducers = { [name]: {} }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    DecorateAll(APIReduxBuilder.build(this.reducers, initialState) as any)(this.constructor)

    this.reducers = { [name]: combineReducers(this.reducers[name]) }
  }

  static build(reducers: APIReduxBuilder['reducers'], initialState: any) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      const constant = createAPIconstant(target.name, propertyKey)
      APIReduxBuilder.decorateAction(descriptor, constant)
      APIReduxBuilder.createReducer(reducers, initialState, constant, target.name, propertyKey)
    }
  }

  static decorateAction(descriptor: PropertyDescriptor, stageActionTypes: StageActionTypes) {
    const original = descriptor.value

    descriptor.value = function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        type,
        stageActionTypes,
        ...original.call(this),
      }
    }
  }

  static createReducer(
    reducers: APIReduxBuilder['reducers'],
    initialState: any,
    constant: StageActionTypes,
    name: string,
    propertyKey: string
  ) {
    const uncapitalizedName = uncapitalize(name)
    reducers[uncapitalizedName] = {
      ...reducers[uncapitalizedName],
      [propertyKey]: createAPIReducer(initialState[propertyKey], constant),
    }
  }
}
