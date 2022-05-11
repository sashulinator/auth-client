import { atom } from 'recoil'

export const selectedCompIdsState = atom<string[]>({
  key: 'selectedCompIdsState',
  default: [],
})
