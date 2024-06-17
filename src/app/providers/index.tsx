// eslint-disable-next-line import/no-internal-modules
import '@/shared/styles/animations.css'
import '@/shared/styles/globals.css'
import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GlobalLayout } from './global-layout'
import { AppRouter } from './router'

const Root = () => {
  return (
    <StrictMode>
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <GlobalLayout>
            <AppRouter />
          </GlobalLayout>
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  )
}

export default Root
