import {has, ifElse, map, prop} from 'ramda'
import {Suspense, memo, useCallback} from 'react'
import {Route, Routes} from 'react-router-dom'
import {Private, Public} from './RequireAuth'
import {AppRoutesProps, routeConfig} from './config'

const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<div>loading...</div>}>
                {prop('element', route)}
            </Suspense>
        )

        return (
            <Route
                key={prop('path', route)}
                path={prop('path', route)}
                element={ifElse(
                    has('authOnly'),
                    () => <Private>{element}</Private>,
                    () => <Public>{element}</Public>
                )(route)}
            />
        )
    }, [])

    return <Routes>{map(renderWithWrapper, Object.values(routeConfig))}</Routes>
})

export default AppRouter
