import { isAuth } from '@/shared/lib/is-auth'
import { getRoutes } from '@/shared/model/router'
import { prop } from 'ramda'
import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const Private = ({ children }: PropsWithChildren) =>
  !isAuth() ? <Navigate to={getRoutes().getRouteLogin()} replace /> : children

export const Public = ({ children }: PropsWithChildren) => {
  const location = useLocation()

  return isAuth() &&
    [getRoutes().getRouteLogin()].includes(prop('pathname', location)) ? (
    <Navigate to={getRoutes().getRouteMain()} replace />
  ) : (
    children
  )
}
