import React, { useContext, useState, useCallback, useEffect } from 'react';

const StoreContext = React.createContext({});
const store = {
  current: {}
};
const GStateContextProvider = StoreContext.Provider;
const useGState = gState => {
  const {
    get,
    set,
    subscribe,
    unsubscribe
  } = useContext(StoreContext);
  const [state, setState] = useState(gState.value);
  const setter = useCallback(val => {
    set === null || set === void 0 ? void 0 : set(gState.key, val);
  }, []);
  useEffect(() => {
    const subscriber = () => {
      const updatedState = get === null || get === void 0 ? void 0 : get(gState.key);
      setState(() => updatedState);
    };
    subscribe === null || subscribe === void 0 ? void 0 : subscribe(subscriber);
    return () => {
      unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe(subscriber);
    };
  }, []);
  return [state, setter];
};
let gStateCnt = 0;
const gState = value => {
  const key = `gState#${++gStateCnt}`;
  store.current[key] = value;
  return {
    key,
    value
  };
};
const premetiveTypes = ['number', 'string', 'bigInt', 'boolean'];
const GStateProvider = ({
  children
}) => {
  const get = React.useCallback(a => {
    return store.current[a];
  }, []);
  const set = React.useCallback((a, val) => {
    if (premetiveTypes.includes(typeof val)) {
      store.current[a] = val;
    } else {
      store.current[a] = {
        ...store.current[a],
        ...val
      };
    }
    subs.current.forEach(sub => sub());
  }, []);
  const subs = React.useRef(new Set());
  const subscribe = React.useCallback(fn => {
    subs.current.add(fn);
  }, []);
  const unsubscribe = React.useCallback(fn => {
    subs.current.delete(fn);
  }, []);
  return React.createElement(GStateContextProvider, {
    value: {
      get,
      set,
      subscribe,
      unsubscribe
    }
  }, children);
};

export default useGState;
export { GStateProvider, gState };
//# sourceMappingURL=index.modern.js.map
