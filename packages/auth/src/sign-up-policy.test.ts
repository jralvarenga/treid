import { describe, expect, test } from 'bun:test'

import { resolveSignUpPolicy } from './sign-up-policy'

describe('resolveSignUpPolicy', () => {
  test('keeps sign-up open in production by default', () => {
    expect(
      resolveSignUpPolicy({
        NODE_ENV: 'production',
        VERCEL_ENV: 'production',
      })
    ).toEqual({ disableSignUp: false })
  })

  test('keeps sign-up open in development by default', () => {
    expect(resolveSignUpPolicy({ NODE_ENV: 'development' })).toEqual({
      disableSignUp: false,
    })
  })

  test('closes sign-up when AUTH_DISABLE_SIGNUP is true', () => {
    expect(resolveSignUpPolicy({ AUTH_DISABLE_SIGNUP: 'true' })).toEqual({
      disableSignUp: true,
    })
    expect(resolveSignUpPolicy({ AUTH_DISABLE_SIGNUP: '1' })).toEqual({
      disableSignUp: true,
    })
  })

  test('keeps sign-up open when AUTH_DISABLE_SIGNUP is false', () => {
    expect(resolveSignUpPolicy({ AUTH_DISABLE_SIGNUP: 'false' })).toEqual({
      disableSignUp: false,
    })
  })
})
