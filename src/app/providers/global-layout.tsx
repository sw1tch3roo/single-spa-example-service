import { PropsWithChildren } from 'react'

export const GlobalLayout = ({ children }: PropsWithChildren) => {
  // тут может быть какая-то логика

  return <div className='app'>{children}</div>
}
