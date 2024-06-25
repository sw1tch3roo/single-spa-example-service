import { propOr } from 'ramda'

export const globalEnvs = {
  BASE_API_URL: propOr('', 'REACT_APP_BASE_API_URL', window) as string
}
