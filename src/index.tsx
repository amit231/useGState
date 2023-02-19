import React, {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'


const StoreContext = React.createContext<
  Partial<{
    get: (a: string) => any
    set: (a: string, v: object) => void
    subscribe: (fn: () => void) => void
    unsubscribe: (fn: () => void) => void
  }>
>({})


const store = {
  current:{}
};
const GStateContextProvider = StoreContext.Provider
interface IgState {
  key: string
  value: any
}

const useGState = (gState: IgState) => {
  const { get, set, subscribe, unsubscribe } = useContext(StoreContext)
  const [state, setState] = useState(gState.value)

  const setter = useCallback((val) => {
    set?.(gState.key, val)
  }, [])
  useEffect(() => {
    const subscriber = () => {
      const updatedState = get?.(gState.key)
      setState(()=>updatedState)
    }
    subscribe?.(subscriber)
    return () => {
      unsubscribe?.(subscriber)
    }
  }, [])

  return [state, setter]
}

let gStateCnt = 0
const gState = (value: any): IgState => {
  const key = `gState#${++gStateCnt}`
  store.current[key] = value;
  return { key, value }
}
export default useGState;
const premetiveTypes = ['number','string','bigInt','boolean']
const GStateProvider = ({ children }: { children: JSX.Element }) => {
  const get = React.useCallback((a: string) => {
    return store.current[a]
  }, [])
  const set = React.useCallback((a: string, val: any) => {
    if(premetiveTypes.includes(typeof val)){
      store.current[a] = val;
    } else{
      store.current[a] = { ...store.current[a], ...val }
    }
    subs.current.forEach(sub=>sub());
  }, [])
  const subs = React.useRef(new Set<() => void>())
  const subscribe = React.useCallback((fn: () => void) => {
    subs.current.add(fn)
  }, [])
  const unsubscribe = React.useCallback((fn: () => void) => {
    subs.current.delete(fn)
  }, [])
  return (
    <GStateContextProvider value={{ get, set, subscribe, unsubscribe }}>
      {children}
    </GStateContextProvider>
  )
}

export {GStateProvider,gState};
