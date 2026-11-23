export type SignUpPolicy = {
  disableSignUp: boolean
}

/**
 * Reads AUTH_DISABLE_SIGNUP. Sign-up is open by default in every environment;
 * `true` or `1` closes it.
 */
export function resolveSignUpPolicy(
  source: Record<string, string | undefined>
): SignUpPolicy {
  return {
    disableSignUp: isEnvFlagTrue(source.AUTH_DISABLE_SIGNUP),
  }
}

/** True for `true` or `1`. */
function isEnvFlagTrue(value: string | undefined): boolean {
  if (!value) {
    return false
  }

  const normalized = value.trim().toLowerCase()

  return normalized === 'true' || normalized === '1'
}
