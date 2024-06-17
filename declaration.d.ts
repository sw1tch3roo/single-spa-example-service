type Nullable<T> = T | null | undefined
type NonEmptyArray<T> = [T, ...T[]]

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}

declare module '*.svg?react' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
}
