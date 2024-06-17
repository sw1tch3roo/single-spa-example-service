import React from 'react'
import ReactDOMClient from 'react-dom/client'
import singleSpaReact from 'single-spa-react'
import Root from './app/providers'

export const { bootstrap, mount, unmount } = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  // @ts-ignore
  errorBoundary(err, info, props) {
    console.log('err:', err)
    console.log('info:', info)
    return null
  },
})
