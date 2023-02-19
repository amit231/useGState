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

const nameGState = gState('G')
const ageGState = gState(12)
const isMaleGState = gState(false)
const premetiveTypes = ['number','string','bigInt','boolean']
export const GStateProvider = ({ children }: { children: JSX.Element }) => {
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

const App = () => {
  return (
    <GStateProvider>
      <Client />
    </GStateProvider>
  )
}

export default App
const Client = () => {
  return (
   <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Name />
    <Age />
    <Gender />
   </div>
  )
}
const Name = () => {
  const [getter, setter] = useGState(nameGState)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px',border:'1px solid black',borderRadius:'4px',margin:'40vh auto'}}>
      <input
        value={getter}
        onChange={(e) => {
          setter(e.target.value)
        }}
        autoFocus={true}
      ></input>
      <div>Your name is "{getter}"</div>
      <Age />
    </div>
  )
}
const Age = () => {
  const [getter, setter] = useGState(ageGState)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px',border:'1px solid black',borderRadius:'4px',margin:'40vh auto'}}>
      <input
        value={getter}
        type="number"
        onChange={(e) => {
          setter(e.target.value)
        }}
      ></input>
      <div>Your age is "{getter}"</div>

    </div>
  )
}


const Gender = () => {
  const [getter, setter] = useGState(isMaleGState)
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px',border:'1px solid black',borderRadius:'4px',margin:'40vh auto'}}>
      <input
        value={getter}
        type="radio"
        onChange={(e) => {
          setter(e.target.value)
        }}
      ></input>
      <div>You are a "{getter?'male':'female'}"</div>


    </div>
  )
}


