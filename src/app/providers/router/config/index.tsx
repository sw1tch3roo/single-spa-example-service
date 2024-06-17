import {NotFoundPage} from '@/pages/404'
import {LoginPage} from '@/pages/login'
import {MainPage} from '@/pages/main'
import {AppRoutes, getRoutes} from '@/shared/model/router'
import {RouteProps} from 'react-router'
import {Navigate} from 'react-router-dom'

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.ROOT]: {
        path: `/`,
        element: <Navigate to={getRoutes().getRouteMain()} replace/>,
    },
    [AppRoutes.MAIN]: {
        path: `/main`,
        element: <MainPage/>,
    },
    [AppRoutes.LOGIN]: {
        path: `/login`,
        element: <LoginPage/>,
    },

    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage/>,
    },
}
