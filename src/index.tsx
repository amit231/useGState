import * as React from 'react'
import styles from './styles.module.css'



const GStateContextProvider = React.createContext({}).Provider;

export const GStateProvider = ({children}:{children:React.ReactChildren}) => {
  const store = React.useRef({})
  const get = React.useCallback((a:string)=>{return store[a]},[])
  const set = React.useCallback((a:string,val:any)=>{store.current = {...store.current[a],...val}},[])
  return <GStateContextProvider value={{get,set}}>
    {children}
  </GStateContextProvider>
}
