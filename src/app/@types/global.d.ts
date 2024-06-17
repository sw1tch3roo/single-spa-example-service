export {}

declare global {
    interface AppConfig {
        BASE_API_URL: string
    }

    interface Window {
        REACT_APP_BASE_API_URL: string
    }
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }

    const classNames: IClassNames
    export = classNames
}

declare module '*.svg' {
    import * as React from 'react'
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
    const src: string
    export default src
}

declare module '*.svg?react' {
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >
}

declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'

declare const __PROJECT__: 'storybook' | 'frontend' | 'jest'
