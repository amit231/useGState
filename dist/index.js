function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var StoreContext = React__default.createContext({});
var store = {
  current: {}
};
var GStateContextProvider = StoreContext.Provider;
var useGState = function useGState(gState) {
  var _useContext = React.useContext(StoreContext),
    get = _useContext.get,
    set = _useContext.set,
    subscribe = _useContext.subscribe,
    unsubscribe = _useContext.unsubscribe;
  var _useState = React.useState(gState.value),
    state = _useState[0],
    setState = _useState[1];
  var setter = React.useCallback(function (val) {
    set === null || set === void 0 ? void 0 : set(gState.key, val);
  }, []);
  React.useEffect(function () {
    var subscriber = function subscriber() {
      var updatedState = get === null || get === void 0 ? void 0 : get(gState.key);
      setState(function () {
        return updatedState;
      });
    };
    subscribe === null || subscribe === void 0 ? void 0 : subscribe(subscriber);
    return function () {
      unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe(subscriber);
    };
  }, []);
  return [state, setter];
};
var gStateCnt = 0;
var gState = function gState(value) {
  var key = "gState#" + ++gStateCnt;
  store.current[key] = value;
  return {
    key: key,
    value: value
  };
};
var premetiveTypes = ['number', 'string', 'bigInt', 'boolean'];
var GStateProvider = function GStateProvider(_ref) {
  var children = _ref.children;
  var get = React__default.useCallback(function (a) {
    return store.current[a];
  }, []);
  var set = React__default.useCallback(function (a, val) {
    if (premetiveTypes.includes(typeof val)) {
      store.current[a] = val;
    } else {
      store.current[a] = _extends({}, store.current[a], val);
    }
    subs.current.forEach(function (sub) {
      return sub();
    });
  }, []);
  var subs = React__default.useRef(new Set());
  var subscribe = React__default.useCallback(function (fn) {
    subs.current.add(fn);
  }, []);
  var unsubscribe = React__default.useCallback(function (fn) {
    subs.current["delete"](fn);
  }, []);
  return React__default.createElement(GStateContextProvider, {
    value: {
      get: get,
      set: set,
      subscribe: subscribe,
      unsubscribe: unsubscribe
    }
  }, children);
};

exports.GStateProvider = GStateProvider;
exports.default = useGState;
exports.gState = gState;
//# sourceMappingURL=index.js.map
