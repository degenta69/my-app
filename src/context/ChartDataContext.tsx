import React from 'react'

type Props = {}

const Context = React.createContext({})

export const ChartDataContextProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children }) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>
}
