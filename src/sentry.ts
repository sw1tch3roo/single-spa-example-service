import { captureException } from '@sentry/react'

export const throwSentryError = (e: unknown) => {
  captureException(e)
}
