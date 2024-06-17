export enum AppRoutes {
    ROOT = 'root',
    MAIN = 'main',
    LOGIN = 'login',

    NOT_FOUND = 'not_found',
}

export const getRoutes = () => ({
    getRouteMain: () => '/main',
    getRouteLogin: () => '/login',
})
