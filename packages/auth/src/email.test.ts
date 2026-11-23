import { describe, expect, test } from 'bun:test'

import { describeResendError } from './email'

describe('describeResendError', () => {
  test("includes Resend's reason so the log explains the failure", () => {
    expect(
      describeResendError({
        message: 'The treid.app domain is not verified.',
        name: 'validation_error',
        statusCode: 403,
      })
    ).toBe(
      'Email delivery failed (Resend validation_error 403): The treid.app domain is not verified.'
    )
  })

  test('omits a missing status code', () => {
    expect(
      describeResendError({
        message: 'Unable to fetch data.',
        name: 'application_error',
        statusCode: null,
      })
    ).toBe(
      'Email delivery failed (Resend application_error): Unable to fetch data.'
    )
  })
})
