import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { ExampleComponent } from 'usegstate'
import 'usegstate/dist/index.css'

const StoreContext = React.createContext<
  Partial<{ get: () => object; set: (a: string, v: object) => void }>
>({})

const GStateContextProvider = StoreContext.Provider
interface IgState {key:string,value:any};

const useStore = (gState:IgState) => {
  const { get, set } = useContext(StoreContext)
  const [v, setv] = useState(1)
  const setter = useCallback((v) => {
    set(gState.key, { val: v })
    setv((v) => v + 1)
  }, [])
  const getter = useMemo(() => {
    return get(gState.key)?.val
  }, [v])
  useEffect(()=>{
    set(gState.key, { val: gState.value})
  }
  ,[])

  return [getter, setter]

  //  const {get,set}  = useContext(StoreContext);
}

let stateCount = 0;
const gState = (value:any):IgState=>{
  const key = `gState#${++stateCount}`;
  return {key,value};
}

const ipState = gState('');

export const GStateProvider = ({ children }: { children: JSX.Element }) => {
  const store = React.useRef({})
  const get = React.useCallback((a: string) => {
    return store.current[a]
  }, [])
  const set = React.useCallback((a: string, val: any) => {
    store.current[a] = { ...store.current[a], ...val }
    console.log(`store: `,store);
  }, [])
  return (
    <GStateContextProvider value={{ get, set }}>
      {children}
    </GStateContextProvider>
  )
}






const App = () => {
  return (
    <GStateProvider>
      <Client />
    </GStateProvider>
  )
}

export default App
const Client = () => {
  const [getter, setter] = useStore(ipState)
  return (
    <div>
      {' '}
      <input
        value={getter}
        onChange={(e) => {
          // setIp(e.target.value)
          setter(e.target.value)
        }}
        autoFocus={true}
      ></input>
    </div>
  )
}
