import { atom } from 'jotai'

export const instructorAuthAtom = atom({
  token: localStorage.getItem('instructorToken') ?? null,
  email: localStorage.getItem('instructorEmail') ?? '',
  isLoggedIn: Boolean(localStorage.getItem('instructorToken')),
})