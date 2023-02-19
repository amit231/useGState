# usegstate

> react library for creating global states in most easy way

[![NPM](https://img.shields.io/npm/v/usegstate.svg)](https://www.npmjs.com/package/usegstate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save usegstate
```

## Usage

### Create Global State

```tsx
import { gState } from 'usegstate'

const myGlobalState = gState('hello-world!')

```

### Use Global State

```tsx
import useGState from 'usegstate'

const GenderGetter = () => {
  const [gState,setGState] = useGState(myGlobalState)
  return (
    <div>{gState}</div>
  )
}
```

### Don't forget to wrap your app inside GStateProvider


```tsx
import {GStateProvider} from 'usegstate'

const Wrapper = () => {
  return (
    <GStateProvider>
      <YourWonderfullApp />
    </GStateProvider>
  )
}

```

## License

MIT © [amit231](https://github.com/amit231)
